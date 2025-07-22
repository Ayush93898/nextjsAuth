import { connect } from "@/dbConfig/dbConfif";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // Find user with non-expired token
    const users = await User.find({
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    let matchedUser = null;

    // Compare each hashed token to the one provided (token is raw from email)
    for (const user of users) {
      const isMatch = await bcrypt.compare(token, user.forgotPasswordToken);
      if (isMatch) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(password, 10);
    matchedUser.password = hashedPassword;
    matchedUser.forgotPasswordToken = undefined;
    matchedUser.forgotPasswordTokenExpiry = undefined;

    await matchedUser.save();

    return NextResponse.json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
