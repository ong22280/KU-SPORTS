/* Importing the `NextApiRequest` and `NextApiResponse` types from the `next` package. 
These types are used to define the request and response objects for Next.js API routes. */
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
// jose is a JavaScript implementation of the JSON Object Signing and Encryption (JOSE) IETF standards.
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // req.method is a string that indicates the HTTP request method of the request
  if (req.method === "POST") {
    const { firstName, lastName, email, phone, faculty, password } = req.body;
    /* req.body is an object of data that contains the parsed body of the request
    Example:
    {
        firstName: 'John',
        lastName: 'Doe',
        email: '
        phone: '1234567890',
        faculty: 'New York',
        password: 'password'
    }
    */
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is invalid",
      },
      {
        valid: validator.isLength(faculty, { min: 1 }),
        errorMessage: "Faculty is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is not strong enough",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      return res
        .status(400)
        .json({ errorMessage: "Email is associated with another account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    /* salt is a random string that is used to hash the password
    to make it more secure and harder to crack by brute force attacks*/

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        faculty,
        phone,
        email,
      },
    });

    const alg = "HS256";

    /* `const secret = new TextEncoder().encode(process.env.JWT_SECRET);` 
    is encoding the `JWT_SECRET` environment variable as a UTF-8 encoded byte array using the `TextEncoder()` method. 
    This encoded byte array is then used as the secret key 
    for signing the JSON Web Token (JWT) using the `jose` library. */
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      faculty: user.faculty,
    });
  }

  return res.status(404).json("Unknown endpoint");
}
