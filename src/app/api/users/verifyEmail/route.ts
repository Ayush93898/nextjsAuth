import { connect } from "@/dbConfig/dbConfif";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Received token:", token);

    // 1. Find all users with valid (non-expired) tokens
    const users = await User.find({
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // 2. Check token against each user
    let matchedUser = null;
    for (const user of users) {
      const isMatch = await bcrypt.compare(token, user.verifyToken);
      if (isMatch) {
        matchedUser = user;
        break;
      }
    }

    // 3. Handle case where no match was found
    if (!matchedUser) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // 4. Mark user as verified
    matchedUser.isVerified = true;
    matchedUser.verifyToken = undefined;
    matchedUser.verifyTokenExpiry = undefined;
    await matchedUser.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
