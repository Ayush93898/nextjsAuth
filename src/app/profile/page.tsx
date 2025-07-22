"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      setTimeout(() => {
        router.push("/login");
      }, 800);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const [data, setdata] = useState("nothing");
  
 const getUserDetails = async () => {
  try {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setdata(res.data.data._id);
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Failed to fetch user data");
  }
};


  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-xl bg-zinc-900 text-white py-10 px-6 text-center rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">Profile Page</h1>
        <h2 className="p-3 rounded-2xl ">
          {data === "nothing" ? (
            "NOTHING"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <button
          onClick={logout}
          className="bg-red-600 mb-2 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Logout
        </button>
        <hr />
        <button
          onClick={getUserDetails}
          className="bg-red-600 mt-2 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          get details
        </button>
      </div>
    </div>
  );
}
