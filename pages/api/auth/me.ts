// This endpoint is used to get the user's information from the database. 
import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  /* This line of code is extracting the authorization header from the incoming request and assigning it to the `bearerToken` variable. 
  The `as string` syntax is used to explicitly tell TypeScript that the value of `req.headers["authorization"]` is a string. 
  The authorization header typically contains a token that is used to authenticate and authorize the user making the request. */
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];

  // use the jwt.decode method to get the payload from the token
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).json({
      errorMessage: "Unauthorized request",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      faculty: true,
      phone: true,
    },
  });

  if (!user) {
    return res.status(401).json({
      errorMessage: "User not found",
    });
  }

  return res.json({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    faculty: user.faculty,
  });
}