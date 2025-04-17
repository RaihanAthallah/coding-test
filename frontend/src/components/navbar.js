"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="w-full bg-black text-white px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Sales Dashboard</h1>
          <div className="flex gap-6 text-sm sm:text-base">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/chatbot" className="hover:underline">
              Chatbot
            </Link>
          </div>
        </div>
      </nav>
      <div className="h-[3px] w-full bg-gradient-to-r from-cyan-500 to-black mt-3" />
    </>
  );
};

export default Navbar;
