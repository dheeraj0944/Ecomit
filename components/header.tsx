"use client";

import Link from "next/link";
import { Leaf, Recycle } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-green-200 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-green-600 rounded-full flex items-center justify-center">
                <Recycle className="h-5 w-5 text-white animate-spin-slow" />
              </div>
              <div className="absolute inset-0 border-2 border-green-600 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-green-800">EcoMit</span>
          </Link>
        </div>
      </div>
    </header>
  );
} 