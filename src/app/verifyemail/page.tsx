"use client";

// this is frontend page telling about the page is verified or not

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  // few important states
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, seterror] = useState(false);
  const [loading, setLoading] = useState(false);

  // Client-Side Email Verification Handler
  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      seterror(true);
      console.log(error.response?.data || error.message);

    } finally {
      setLoading(false);
    }
  };
  
  //This code extracts the token from the URL (like ?token=abc123)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFormUrl = urlParams.get("token");
    setToken(tokenFormUrl || "");
  }, []);

  useEffect(() => {
  if (token) {
    verifyUserEmail();
  }
}, [token]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `Token: ${token}` : "No token provided"}
      </h2>

    {loading && (
        <h2 className="text-xl text-blue-500 mt-4">Verifying token...</h2>
      )}

      {verified && (
        <div className="mt-4">
          <h2 className="text-2xl text-green-600">✅ Email Verified!</h2>
          <Link href="/login" className="text-blue-500 underline mt-2 block">
            Go to Login
          </Link>
        </div>
      )}


      {error && (
        <div className="mt-4">
          <h2 className="text-2xl text-red-600">
            ❌ Token is invalid or expired.
          </h2>
          <p className="text-gray-700 mt-2">
            Please request a new verification email.
          </p>
        </div>
      )}
    </div>
  );
}
