"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [isLoading, setIsLoading] = useState(false);
  const [isHoveringToken, setIsHoveringToken] = useState(false);
  const [quote, setQuote] = useState({
    text: "The only way to achieve the impossible is to believe it is possible.",
    anime: "Alice in Wonderland"
  });

  useEffect(() => {
    // You could fetch random anime quotes from an API here
    const quotes = [
      { text: "Hard work betrays none, but dreams betray many.", anime: "Hyouka" },
      { text: "It's not the world that's messed up; it's those of us in it.", anime: "Tokyo Ghoul" },
      { text: "If you don't take risks, you can't create a future!", anime: "One Piece" }
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Session terminated");
      setTimeout(() => {
        router.push("/login");
      }, 800);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
      toast.success("Identity verified");
    } catch (error: any) {
      console.log(error);
      toast.error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 md:px-0 font-mono relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4a00e010_0%,transparent_70%)]" />
      </div>

      {/* Animated scanline */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/80 z-20 animate-scanline" />

      {/* Main terminal interface */}
      <div className="w-full max-w-4xl mx-4 border border-blue-500/30 bg-black/70 backdrop-blur-md rounded-xl shadow-[0_0_60px_-15px_rgba(99,102,241,0.3)] overflow-hidden z-10">
        {/* Terminal header */}
        <div className="border-b border-blue-500/20 p-4 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-center flex-1 text-sm text-blue-400/80 font-medium tracking-wider">
            USER_PROFILE_TERMINAL
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-8 md:p-12">
          {/* Header */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tighter">
             PROFILE_ACCESS
          </h1>

          {/* Anime quote */}
          <div className="mb-12 border-l-4 border-blue-500/50 pl-4 py-2 bg-blue-900/10">
            <p className="text-blue-300 italic text-lg">"{quote.text}"</p>
            <p className="text-blue-500/80 text-sm mt-1">— {quote.anime}</p>
          </div>

          {/* Token display */}
          <div className="mb-12">
            {data === "nothing" ? (
              <div className="text-center py-8">
                <p className="text-neutral-400 mb-6 tracking-wider">
                  [AWAITING_INPUT]
                </p>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              </div>
            ) : (
              <div 
                className="border border-blue-500/30 bg-black/50 p-6 rounded-lg transition-all duration-500 hover:border-blue-400/50 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
                onMouseEnter={() => setIsHoveringToken(true)}
                onMouseLeave={() => setIsHoveringToken(false)}
              >
                <h2 className="text-xl text-blue-400 mb-4 font-medium tracking-wider">
                   USER_TOKEN
                </h2>
                <div className="relative">
                  <Link 
                    href={`/profile/${data}`}
                    className={`block p-4 font-mono break-all bg-black/70 rounded border border-blue-500/20 transition-all duration-300 ${isHoveringToken ? 'text-white bg-blue-900/20' : 'text-blue-300'}`}
                  >
                    {data}
                  </Link>
                  {isHoveringToken && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 text-black px-2 py-1 text-xs font-bold rounded">
                      CLICK_TO_VERIFY
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={getUserDetails}
              disabled={isLoading || data !== "nothing"}
              className={`px-8 py-3 rounded-lg border font-medium text-lg tracking-wider flex items-center justify-center transition-all duration-300 ${
                isLoading || data !== "nothing"
                  ? "border-gray-800 text-gray-600 bg-gray-900/50 cursor-not-allowed"
                  : "border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-white hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
              }`}
            >
              {isLoading && data === "nothing" ? (
                <>
                  <span className="animate-pulse mr-2">■</span> PROCESSING...
                </>
              ) : (
                "> GET_TOKEN"
              )}
            </button>
            <button
              onClick={logout}
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg border font-medium text-lg tracking-wider flex items-center justify-center transition-all duration-300 ${
                isLoading
                  ? "border-red-900/50 text-red-900/50 bg-red-900/10 cursor-not-allowed"
                  : "border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 hover:text-white hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]"
              }`}
            >
              {isLoading ? "■ TERMINATING..." : "> LOGOUT"}
            </button>
          </div>
        </div>

        {/* Terminal footer */}
        <div className="border-t border-blue-500/20 p-4 text-xs text-blue-500/50 flex justify-between">
          <div>SYSTEM_STATUS: OPERATIONAL</div>
          <div>LAST_ACCESS: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Glowing orb effects */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/10 filter blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-500/10 filter blur-[80px] animate-pulse-slow delay-1000" />

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