"use client";

import Link from "next/link";
import GraphCanvas from "../GraphCanvas";


export default function AboutPage() {
  
  return (
    <div className="relative flex justify-center items-center min-h-screen w-full bg-white">
      <GraphCanvas />
      <div className="relative bg-white shadow-2xl rounded-2xl p-10 text-center space-y-6 w-full max-w-4xl"> 
        <h1 className="text-5xl font-bold text-gray-900 tracking-wide transform transition-transform duration-300 hover:scale-105">
          Welcome to FunProg!
        </h1>
        <p className="text-xl text-gray-700 opacity-80">
          Embrace the excitement of Monads, Random Access Lists and... Maps! Learn all about functional programming from the basics, so let’s dive into fun and discover new things together!
        </p>
        <button
          className="px-6 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition duration-200 transform hover:scale-105"
        ><Link
            href="/problem/1">
          Start Learning

            </Link>
        </button>
      </div>
    </div>
  );
}
