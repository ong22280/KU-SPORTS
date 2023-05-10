// Extracting the court Availability into it's own function

import { PrismaClient, Court } from "@prisma/client";
import { NextApiResponse } from "next";
import { times } from "../../data";

const prisma = new PrismaClient();

export const findAvailabileCourts = async ({
  time,
  day,
  res,
  sport,
}: {
  time: string;
  day: string;
  res: NextApiResponse;
  sport: {
    courts: Court[];
    open_time: string;
    close_time: string;
  };
}) => {
  // step 1: Determining the search times
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  // step 2: Fetching all the bookings for sport between the open and close time (search times)
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        // gte is greater than or equal to
        gte: new Date(`${day}T${searchTimes[0]}`), // first search time
        // lte is less than or equal to
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`), // last search time
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      courts: true,
    },
  });

  const bookingCourtsObj: { [key: string]: { [key: number]: true } } = {};

  // step 3: Compressing the bookings into an object
  /* This code is creating an object `bookingCourtsObj` that maps booking times to courts that are already booked. 
    It does this by iterating through each booking in the `bookings` array, 
    and for each booking it creates a new key in `bookingCourtsObj` with the booking time in ISO string format. 
    It then reduces the `courts` array of the booking to an object where each key is a court ID and the value is `true`. 
    This object is then assigned to the corresponding key in `bookingCourtsObj`. 
    This allows for easy lookup of booked courts for a given booking time. */
  bookings.forEach((booking) => {
    bookingCourtsObj[booking.booking_time.toISOString()] =
      booking.courts.reduce((obj, court) => {
        // reduce is used to transform an array into an object
        return {
          ...obj,
          [court.court_id]: true,
        };
      }, {});
  });

  const courts = sport.courts;

  // step 5: reformatting the SearchTimes to include the date, time and courts
  const searchTimesWithCourts = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      courts,
    };
  });

  // step 6: filter out the courts that are already booked
  searchTimesWithCourts.forEach((t) => {
    t.courts = t.courts.filter((court) => {
      // if the bookingCourtsObj has a key that matches the booking time and court ID, then the court is already booked
      if (bookingCourtsObj[t.date.toISOString()]) {
        if (bookingCourtsObj[t.date.toISOString()][court.id]) return false;
      }
      return true;
    });
  });

  return searchTimesWithCourts;
};
