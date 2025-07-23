"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function CyberpunkVerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      toast.success("NEURAL IDENTITY CONFIRMED");
    } catch (error: any) {
      setError(true);
      toast.error("VERIFICATION FAILED: " + (error.response?.data?.error || "Invalid quantum signature"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    setToken(tokenFromUrl || "");
  }, [searchParams]);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00ffaa10_0%,transparent_70%)]" />
      </div>

      {/* Animated scanline */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500/80 z-20 animate-scanline" />

      {/* Glowing orb effects */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-green-500/10 filter blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-teal-500/10 filter blur-[80px] animate-pulse-slow delay-1000" />

      {/* Main terminal interface */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md p-8 md:p-10 bg-black/70 backdrop-blur-lg border border-green-500/30 rounded-xl shadow-[0_0_60px_-15px_rgba(0,255,170,0.3)]">
          <h1 className="text-4xl md:text-3 xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 tracking-tighter">
             IDENTITY_VERIFICATION
          </h1>

          {/* Token display */}
          <div className="mb-8 p-4 bg-black/50 border border-green-500/20 rounded-lg overflow-hidden">
            <p className="text-sm text-green-500/80 mb-2 tracking-wider">QUANTUM_SIGNATURE:</p>
            <p className="font-mono text-green-300 break-all text-sm">
              {token ? `${token.substring(0, 12)}...${token.substring(token.length - 12)}` : "NO_SIGNATURE_DETECTED"}
            </p>
          </div>

          {/* Status messages */}
          <div className="space-y-6 text-center">
            {loading && (
              <div className="p-4 border border-green-500/30 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <span className="animate-pulse">■</span>
                  <span className="text-green-400 tracking-wider">DECRYPTING_NEURAL_PATTERNS...</span>
                </div>
              </div>
            )}

            {verified && (
              <div className="p-6 border border-green-500/50 bg-green-900/10 rounded-lg">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-400 mb-2 tracking-wider">VERIFICATION_COMPLETE</h2>
                <p className="text-green-300/80 mb-4">NEURAL_IDENTITY_CONFIRMED</p>
                <Link
                  href="/login"
                  className="inline-block px-6 py-2 border border-green-500/50 text-green-400 hover:bg-green-900/20 rounded-lg transition-all duration-300 tracking-wider"
                >
                   ACCESS_NEURAL_NETWORK
                </Link>
              </div>
            )}

            {error && (
              <div className="p-6 border border-red-500/50 bg-red-900/10 rounded-lg">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-400 mb-2 tracking-wider">VERIFICATION_FAILED</h2>
                <p className="text-red-300/80 mb-4">INVALID_QUANTUM_SIGNATURE</p>
                <div className="text-xs text-red-500/60 mt-4">
                  REQUEST_NEW_VERIFICATION_PULSE
                </div>
              </div>
            )}
          </div>

          {/* System footer */}
          <div className="mt-10 pt-4 border-t border-green-500/10 text-xs text-green-500/50 text-center">
            SYSTEM_STATUS: {verified ? "SECURE" : error ? "COMPROMISED" : "SCANNING"}
          </div>
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