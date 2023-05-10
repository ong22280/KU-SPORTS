// Building the Scheduling System

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { findAvailabileCourts } from "../../../../services/sport/findAvailableCourts";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    const {
      bookerEmail,
      bookerPhone,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerRequest,
    } = req.body;

    // step 1: Validate the sport exists and that the day is within the opening hours
    const sport = await prisma.sport.findUnique({
      where: {
        slug,
      },
      select: {
        courts: true,
        open_time: true,
        close_time: true,
        id: true,
      },
    });
    if (!sport) {
      return res.status(400).json({
        errorMessage: "Sport not found",
      });
    }
    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${sport.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${sport.close_time}`)
    ) {
      return res.status(400).json({
        errorMessage: "Sport is not open at that time",
      });
    }

    // step 2: Determining the available courts
    const searchTimesWithCourts = await findAvailabileCourts({
      day,
      time,
      res,
      sport,
    });
    if (!searchTimesWithCourts) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    const searchTimeWithCourts = searchTimesWithCourts.find((t) => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
    });
    if (!searchTimeWithCourts) {
      return res.status(400).json({
        errorMessage: "No availablity, cannot book",
      });
    }

    // step 3: Count how  much courts are available
    const courtsCount: {
      2: number[];
      4: number[];
    } = {
      2: [],
      4: [],
    };

    searchTimeWithCourts.courts.forEach((court) => {
      if (court.seats === 2) {
        courtsCount[2].push(court.id);
      } else {
        courtsCount[4].push(court.id);
      }
    });

    // step 4: Determine the courts to book which leads to the least number of seats used up
    const courtsToBooks: number[] = [];
    let seatsRemaining = parseInt(partySize);

    while (seatsRemaining > 0) {
      if (seatsRemaining >= 3) {
        if (courtsCount[4].length) {
          courtsToBooks.push(courtsCount[4][0]);
          courtsCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        } else {
          courtsToBooks.push(courtsCount[2][0]);
          courtsCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        }
      } else {
        if (courtsCount[2].length) {
          courtsToBooks.push(courtsCount[2][0]);
          courtsCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        } else {
          courtsToBooks.push(courtsCount[4][0]);
          courtsCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        }
      }
    }

    // step 5: Create the booking and link the booking to the courts
    const booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(partySize),
        booking_time: new Date(`${day}T${time}`),
        booker_email: bookerEmail,
        booker_phone: bookerPhone,
        booker_first_name: bookerFirstName,
        booker_last_name: bookerLastName,
        booker_occasion: bookerOccasion,
        booker_request: bookerRequest,
        sport_id: sport.id,
      },
    });

    const bookingsOnCourtsData = courtsToBooks.map((court_id) => {
      return {
        court_id,
        booking_id: booking.id,
      };
    });

    await prisma.bookingsOnCourts.createMany({
      data: bookingsOnCourtsData,
    });

    return res.json(booking);
  }
}

// http://localhost:3000/api/sport/vivaan-fine-indian-type-ottawa/reserve?day=2023-02-03&time=15:00:00.000Z&partySize=8
