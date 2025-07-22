// now we writing the backend of forgetting the paaword
// for the logic for forgot password, we have some steps
// user needs a page to enter his email and submit
// if user exist then give the token


//Step 2: Backend API — Send Reset Email 
import { connect } from "@/dbConfig/dbConfif";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    await sendEmail({ email, emailType: "RESET", userID: user._id });

    return NextResponse.json({ message: "Reset email sent", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
