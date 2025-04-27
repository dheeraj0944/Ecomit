"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trophy, Gift, Camera, User, Leaf } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/vouchers", label: "Vouchers", icon: Gift },
    { href: "/greenscan", label: "GreenScan", icon: Camera },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-around items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/ecomit-logo.svg"
              alt="EcoMit Logo"
              width={32}
              height={32}
              className="animate-spin-slow"
            />
          </Link>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`flex flex-col items-center gap-1 h-14 ${
                    isActive ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 