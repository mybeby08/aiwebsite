"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const font = Montserrat({ subsets: ["latin"], weight: "600" });
const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-16 w-16 mr-2">
          <Image alt="logo" src="/logo.svg" fill />
        </div>
        <h1 className={cn("text-2xl font-bold", font.className)}>AI.betsy</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/ai" : "/sign-up"}>
          <Button
            variant="outline"
            className="bg-slate-600 rounded-full text-lg font-semibold"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
