"use client";
// step-3
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) setToken(tokenFromUrl);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/users/resetPassword", { token, password });
      toast.success("Encryption matrix updated successfully!");
      
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Quantum reset failed");
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
      <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500/80 z-20 animate-scanline" />

      {/* Glowing orb effects */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-green-500/10 filter blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-teal-500/10 filter blur-[80px] animate-pulse-slow delay-1000" />

      {/* Main terminal interface */}
      <div className="w-full max-w-md mx-4 border border-green-500/30 bg-black/70 backdrop-blur-md rounded-xl shadow-[0_0_60px_-15px_rgba(74,222,128,0.3)] overflow-hidden z-10">
        {/* Terminal header */}
        <div className="border-b border-green-500/20 p-4 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-center flex-1 text-sm text-green-400/80 font-medium tracking-wider">
            ENCRYPTION_RESET_TERMINAL
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-8">
          {/* Header with gradient text */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 tracking-tighter">
             RESET_SECURITY_MATRIX
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-green-300/80 mb-2 tracking-wider">
                [ENTER_NEW_ENCRYPTION_KEY]
              </label>
              <input
                type="password"
                placeholder="•••••••••••"
                className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 text-white placeholder-green-400/30 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium tracking-wider transition-all duration-300 ${
                isLoading
                  ? "bg-green-900/50 text-green-400/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white shadow-[0_0_20px_-5px_rgba(74,222,128,0.5)] hover:shadow-[0_0_30px_-5px_rgba(74,222,128,0.7)]"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-pulse mr-2">■</span> RECALIBRATING...
                </span>
              ) : (
                "> UPDATE_SECURITY_PROTOCOL"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-green-500/10 text-center">
            <div className="text-xs text-green-500/50 mb-2">
              TOKEN_ID: {token ? `${token.substring(0, 6)}...${token.substring(token.length - 4)}` : "NOT_DETECTED"}
            </div>
            <Link
              href="/login"
              className="text-sm text-green-400/80 hover:text-white transition-colors duration-300 tracking-wider"
            >
              RETURN_TO_AUTH_PORTAL
            </Link>
          </div>
        </div>

        {/* Terminal footer */}
        <div className="border-t border-green-500/20 p-3 text-xs text-green-500/50 flex justify-between">
          <div>SECURITY_LEVEL: CRITICAL</div>
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