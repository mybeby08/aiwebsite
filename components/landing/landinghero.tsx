"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "../ui/button";
const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="font-bold py-32 text-center space-y-5 overflow-y-hidden">
      <div className="text-4xl sm:text-5xl md:text-6xl space-y-5 font-extrabold">
        <h1>
          AIbetsy, the{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            AI
          </span>{" "}
          that helps you for
        </h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot",
                "Photo Generation",
                "Code Generation",
                "Music Generation",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-md font-semibold text-accent text-slate-600">
        Built using Nextjs 13
      </div>
      <div>
        <Link href={isSignedIn ? "/ai" : "/sign-up"}>
          <Button
            variant="premiumlanding"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start generating for free
          </Button>
        </Link>
      </div>
      <div className="text-xs md:text-sm font-normal text-zinc-400">
        No credit card required.
      </div>
    </div>
  );
};

export default LandingHero;
