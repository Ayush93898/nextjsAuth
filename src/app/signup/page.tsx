"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function CyberpunkSignup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("SYSTEM ACCESS GRANTED");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "REGISTRATION FAILED");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-purple-400 font-mono relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#8b5cf610_0%,transparent_70%)]" />
      </div>

      {/* Animated scanline */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-500/80 z-20 animate-scanline" />

      {/* Glowing orb effects */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-500/10 filter blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-fuchsia-500/10 filter blur-[80px] animate-pulse-slow delay-1000" />

      {/* Main container */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Cyberpunk terminal */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10">
          <div 
            className="w-full max-w-md p-8 lg:p-10 bg-black/70 backdrop-blur-lg border border-purple-500/30 rounded-xl shadow-[0_0_60px_-15px_rgba(139,92,246,0.3)] relative z-10 transition-all duration-500 hover:shadow-purple-500/40"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className={`absolute rounded-full bg-purple-400/10 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  top: `${Math.random() * 90 + 5}%`,
                  left: `${Math.random() * 90 + 5}%`,
                  animation: `float ${Math.random() * 10 + 5}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 tracking-tighter">
               REGISTRATION
            </h1>

            {/* Username */}
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm text-purple-400/80 mb-2 tracking-wider">
                [HANDLE]
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="your_callsign"
                  className="w-full px-5 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-200 placeholder-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm text-purple-400/80 mb-2 tracking-wider">
                [NEURAL_LINK_ID]
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="user@neural.net"
                  className="w-full px-5 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-200 placeholder-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm text-purple-400/80 mb-2 tracking-wider">
                [ENCRYPTION_KEY]
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-lg bg-black/50 border border-purple-500/30 text-purple-200 placeholder-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Signup Button */}
            <button
              onClick={onSignup}
              disabled={buttonDisabled || loading}
              className={`w-full py-4 rounded-lg font-bold text-lg tracking-wider transition-all duration-300 relative overflow-hidden ${
                buttonDisabled || loading
                  ? "bg-purple-900/30 text-purple-700/50 cursor-not-allowed border border-purple-900/50"
                  : "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] border border-purple-500/50"
              }`}
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-pulse mr-2">■</span> ENCRYPTING_DATA...
                  </span>
                ) : (
                  "> INITIATE_REGISTRATION"
                )}
              </span>
            </button>

            {/* Already have account */}
            <div className="mt-10 pt-6 border-t border-purple-500/10 text-center">
              <p className="text-xs text-purple-500/60 tracking-wider">
                EXISTING_USER_DETECTED
              </p>
              <Link href="/login" className="text-sm text-purple-400 hover:text-white mt-2 inline-block tracking-wider">
                ACTIVATE_NEURAL_LINK
              </Link>
            </div>
          </div>
        </div>

        {/* Right Panel - Cyberpunk quote */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 border-l border-purple-500/20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tighter">
              <span className="text-purple-400">JOIN THE</span>
              <br />
              <span className="text-white/80">NEURAL</span>
              <br />
              <span className="text-fuchsia-300">NETWORK</span>
            </h1>
            <div className="border-l-4 border-purple-500/50 pl-4 py-2 mt-8">
              <p className="text-purple-300/80 italic text-lg">"The street finds its own uses for things."</p>
              <p className="text-purple-500/60 text-sm mt-1">— William Gibson</p>
            </div>
            <div className="mt-12 bg-black/50 border border-purple-500/20 p-4 rounded-lg">
              <p className="text-purple-400/70 text-sm tracking-wider">
                WARNING: UNAUTHORIZED ACCESS WILL BE MET WITH<br />
                IMMEDIATE NEURAL DISCONNECT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-xs text-purple-500/50 border-t border-purple-500/10 flex justify-between">
        <div>SYSTEM_STATUS: REGISTRATION_OPEN</div>
        <div>SESSION: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(10px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(20px); }
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