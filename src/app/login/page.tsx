"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true)
      const respone = await axios.post("/api/users/login", user) // ye data backend ko bhj dia
      console.log(respone)
      toast.success("login success!!")
      router.push("/profile")
    } catch (error:any) {
      console.log("Login failed", error.message)
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-black text-white">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          {loading ? "Processing" : "Login"}
        </h1>
        <hr className="border-zinc-700 mb-6" />

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
          onClick={onLogin}
          className={`w-full font-semibold py-3 px-4 rounded-lg mb-4 transition duration-300 ${
            buttonDisabled || loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`} // <-- Add your signup function here
        >
          {loading ? "Login..." : "Login"}
        </button>
        {/* link */}
        <p className="text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
