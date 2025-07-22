"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 sm:px-10">
      <div className="max-w-4xl text-center flex flex-col gap-10 items-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={160}
            height={40}
            className="dark:invert"
          />
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
            Welcome to the Future of Web
          </h1>
          <p className="text-gray-400 max-w-xl text-lg sm:text-xl leading-relaxed">
            Build lightning-fast apps with Next.js, styled with modern elegance. Powered by Vercel.
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 sm:p-12 w-full">
          <ol className="list-decimal list-inside text-left space-y-4 text-lg sm:text-xl text-gray-300 font-medium leading-relaxed">
            <li>Edit the file at <code className="text-gray-100 font-semibold">src/app/page.tsx</code> to customize this page.</li>
            <li>Save your changes and see them live instantly — no reload required.</li>
            <li>Deploy this project to the world with one click via Vercel.</li>
          </ol>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black hover:bg-gray-200 font-semibold px-6 py-3 rounded-xl text-lg transition"
          >
            🚀 Deploy with Vercel
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-600 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl text-lg transition"
          >
            📚 Read the Docs
          </a>
        </div>

        {/* Footer Links */}
        <footer className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-500">
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            Learn
          </a>
          <a
            href="https://vercel.com/templates"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            Examples
          </a>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            Next.js Home →
          </a>
        </footer>
      </div>
    </div>
  );
}
