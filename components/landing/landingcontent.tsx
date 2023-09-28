"use client";
import Link from "next/link";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { constants } from "@/constants";
const LandingContent = () => {
  return (
    <footer className="px-10 pb-20 w-full">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 space-x-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">AI.betsy</h1>
          <p className="text-sm text-slate-400">
            AI.betsy helps you for Chatbot, Photo Generation, Code Generation,
            and Music Generation.
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Frameworks</h1>
          <p className="text-sm text-slate-400">
            Frameworks used in this project are Nextjs, Tailwindcss, and Clerk,
            with OPENAI API
          </p>
        </div>
        <div className="space-y-2 col-end-7 col-span-2">
          <h1 className="text-3xl font-bold text-white">Contact</h1>
          <div className="flex flex-col gap-y-3 font-semibold">
            <div className="grid sm:grid-cols-2 gap-x-5">
              <span className="flex">
                <Mail className="mr-2" />
                {constants.EMAIL}
              </span>
              <span className="flex">
                <Phone className="mr-2" />
                {constants.PHONE_NUMBER}
              </span>
              <Link href={constants.GITHUB_URL}>
                <span className="flex">
                  <Github className="mr-2" />
                  Github
                </span>
              </Link>
              <Link href={constants.LINKEDIN_URL}>
                <span className="flex">
                  <Github className="mr-2" />
                  Linkedin
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingContent;
