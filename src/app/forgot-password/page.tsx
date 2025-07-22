"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/users/sendResetEmail", { email });
      toast.success("Quantum link dispatched to your inbox!");
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Transmission failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4a00e010_0%,transparent_70%)]" />
      </div>

      {/* Animated scanline */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500/80 z-20 animate-scanline" />

      {/* Glowing orb effects */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10 filter blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-500/10 filter blur-[80px] animate-pulse-slow delay-1000" />

      {/* Main terminal interface */}
      <div className="w-full max-w-md mx-4 border border-blue-500/30 bg-black/70 backdrop-blur-md rounded-xl shadow-[0_0_60px_-15px_rgba(99,102,241,0.3)] overflow-hidden z-10">
        {/* Terminal header */}
        <div className="border-b border-blue-500/20 p-4 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-center flex-1 text-sm text-blue-400/80 font-medium tracking-wider">
            PASSWORD_RESET_TERMINAL
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-8">
          {/* Header with gradient text */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tighter">
             PASSWORD_RESET
          </h1>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-300/80 mb-2 tracking-wider">
                  [ENTER_EMAIL_ADDRESS]
                </label>
                <input
                  type="email"
                  placeholder="user@domain.com"
                  className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-blue-400/30 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium tracking-wider transition-all duration-300 ${
                  isLoading
                    ? "bg-blue-900/50 text-blue-400/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.7)]"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-pulse mr-2">■</span> INITIATING...
                  </span>
                ) : (
                  "> SUBMIT"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center p-6 bg-blue-900/10 border border-blue-500/20 rounded-lg">
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-blue-300 mb-2 tracking-wider">
                TRANSMISSION_COMPLETE
              </h3>
              <p className="text-blue-400/80 mb-4">
                Quantum link dispatched to <span className="text-white">{email}</span>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-blue-400 hover:text-white px-4 py-2 rounded border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
              >
                <span className="tracking-wider"> RESEND_QUANTUM_PACKET</span>
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-blue-500/10 text-center">
            <Link
              href="/login"
              className="text-sm text-blue-400/80 hover:text-white transition-colors duration-300 tracking-wider"
            >
               RETURN_TO_AUTH_PORTAL
            </Link>
          </div>
        </div>

        {/* Terminal footer */}
        <div className="border-t border-blue-500/20 p-3 text-xs text-blue-500/50 flex justify-between">
          <div>SECURITY_PROTOCOL: ACTIVE</div>
          <div>SESSION: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}