// now we write backend of login page

import { connect } from "@/dbConfig/dbConfif";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect(); // connect the db

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); // getting the data from frontend
    const { email, password } = reqBody;
    console.log(reqBody);

    // now check user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // user exist
    // now check password is correct or not
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //creating the payload for jwt token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // creating the token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    //now token is created have to send in user cookies
    // first set a response
    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });

    //set JWT token in cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// You're doing two things in one go:

// Sending a response to the frontend saying “login was successful”.

// Attaching the JWT token to that response as a cookie, so the user’s browser automatically stores it.

// 🔁 What happens next?
// That cookie (with the JWT) is now saved in the user's browser.

// On future requests, the browser will automatically send that cookie along with the request.

// You (on the backend) can then read that cookie and verify the user using the token.

// ⚠️ Why use httpOnly: true?
// This makes the cookie unreadable by JavaScript, protecting it from XSS attacks — a common security best practice.
