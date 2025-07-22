// in this helper file we write a functionality about generating a token , stored its hashed value in databse, and send a email(for verification and password reset)

import User from "@/model/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {
    // create a random token, and hashed it
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    // now check the email type
    if (emailType === "VERIFY") {
      // find the user on the base of id, and assign the token
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "cc6ee8fed04922",
        pass: "b7a954124e375e", // todo-inko env variable me patakna
      },
    });

    const domain = "http://localhost:3000";
    const link = `${domain}/verifyemail?token=${token}`;

    // mailOptions
    const mailOptions = {
      from: "aa2117354@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${link}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>`,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
