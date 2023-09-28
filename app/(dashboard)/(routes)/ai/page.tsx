"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTools } from "@/constants";
import { ArrowRight } from "lucide-react";
const tools = useTools;

const fadeIn = {
  initial: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};
const Page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the AI Playground and generate images, videos, music, and code
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with AI.betsy and explore the AI Playground to generate images,
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 gap-2 grid grid-cols-2 sm:grid-cols-3">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className={cn(
              "p-4 border-black/10 flex items-center justify-between hover:shadow-xl transition cursor-pointer",
              tool.color
            )}
          >
            <motion.div
              variants={fadeIn}
              animate="animate"
              initial="initial"
              className="flex items-center gap-x-3"
            >
              <div className={cn("p-2 w-fit rounded-md")}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </motion.div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Page;
