// now we are gonna write the backend for signup

import { connect } from "@/dbConfig/dbConfif";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";


connect(); // connect the db

// now create a post method
// ✅ So Why POST for Signup?
// When a user signs up:

//     You're sending data to the server (username, email, password)
//     You're creating a new record in the database
//     This is exactly what POST is designed for

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); // data frontend se aya , jo usestate banayi thi
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // now check user already exist or not
    const user = await User.findOne({ email }); // db query
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    // if not exist- i.e it is new user
    // now hash the passowrd
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // now create the new user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    // now save to the db
    const saveUser = await newUser.save();
    console.log(saveUser);

    // sending the success response
    return NextResponse.json({
      message: "User created successfully !!",
      success: true,
      saveUser,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // sending error as response
  }
}
