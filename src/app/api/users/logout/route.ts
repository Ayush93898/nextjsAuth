// now we write the backend for logout
// kuchni bss token lo usko empty kardo

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },

      {
        status: 500,
      }
    );
  }
}
