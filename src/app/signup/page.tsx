"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter(); // as after the signup , login page pe
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed!!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-black text-white">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          {loading ? "Processing" : "Signup"}
        </h1>
        <hr className="border-zinc-700 mb-6" />

        {/* Username Field */}
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Username
        </label>
        <input
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-400"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />

        {/* Email Field */}
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-400"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        {/* Password Field */}
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <input
          className="w-full p-3 mb-6 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-400"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        {/* Submit Button */}
        <button
          disabled={buttonDisabled || loading}
          onClick={onSignup}
          className={`w-full font-semibold py-3 px-4 rounded-lg mb-4 transition duration-300 ${
            buttonDisabled || loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Link to Login */}
        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Visit Login
          </Link>
        </p>
      </div>
    </div>
  );
}
