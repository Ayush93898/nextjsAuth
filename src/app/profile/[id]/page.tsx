"use client"
export default function UserProfile({ params }: any) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
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
      <div className="w-full max-w-2xl mx-4 border border-blue-500/30 bg-black/70 backdrop-blur-md rounded-xl shadow-[0_0_60px_-15px_rgba(99,102,241,0.3)] overflow-hidden z-10">
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
        <div className="p-8 md:p-10">
          {/* Header with gradient text */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tighter">
            USER_IDENTIFICATION
          </h1>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-8" />

          {/* User ID Display */}
          <div className="mb-8">
            <p className="text-lg text-blue-300 mb-4 tracking-wider">
              [UNIQUE_IDENTIFIER]
            </p>
            <div 
              className="p-6 font-mono break-all bg-black/50 rounded-lg border border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)] transition-all duration-300 group"
            >
              <span className="text-blue-400/70 text-sm block mb-2">DECRYPTED_TOKEN:</span>
              <span className="text-2xl md:text-3xl font-medium text-white group-hover:text-blue-300 transition-colors duration-300">
                {params.id}
              </span>
            </div>
          </div>

          {/* Status indicator */}
          <div className="mt-10 p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-blue-400">SYSTEM_STATUS: VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Terminal footer */}
        <div className="border-t border-blue-500/20 p-4 text-xs text-blue-500/50 flex justify-between">
          <div>SECURITY_LEVEL: MAXIMUM</div>
          <div>LAST_ACCESS: {new Date().toLocaleTimeString()}</div>
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