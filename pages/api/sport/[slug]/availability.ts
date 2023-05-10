// The Availability Endpoint

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { findAvailabileCourts } from "../../../../services/sport/findAvailableCourts";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    if (!day || !time || !partySize) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    // step 4: fetching the sport courts
    const sport = await prisma.sport.findUnique({
      where: {
        slug,
      },
      select: {
        courts: true,
        open_time: true,
        close_time: true,
      },
    });

    if (!sport) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    // step 5: reformatting the SearchTimes to include the date, time and courts
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

    // step 7: filtering the search times to only include times that have enough courts for the party size
    const availabilities = searchTimesWithCourts
      // return the time and whether or not the party size is available
      .map((t) => {
        const sumSeats = t.courts.reduce((sum, court) => {
          return sum + court.seats;
        }, 0);
        return {
          time: t.time,
          available: sumSeats >= parseInt(partySize), // if the sum of the seats is greater than or equal to the party size, then it's available (true)
        };
      })
      // filter out the times that are not available
      .filter((availability: { time: string; available: boolean }) => {
        const timeIsAfterOpeningHour =
          new Date(`${day}T${availability.time}`) >=
          new Date(`${day}T${sport.open_time}`);
        const timeIsBeforeClosingHour =
          new Date(`${day}T${availability.time}`) <=
          new Date(`${day}T${sport.close_time}`);

        return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
      });

    return res.json(availabilities);
  }
}

// http://localhost:3000/api/sport/vivaan-fine-indian-type-ottawa/availability?day=2023-02-03&time=15:00:00.000Z&partySize=8
