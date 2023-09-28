"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";

interface CounterProps {
  count: number;
}
const Counter = ({ count = 0 }: CounterProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0 rounded-xl">
        <CardContent className="py-2">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {count} / {MAX_FREE_COUNTS} FREE GENERATIONS
            </p>
            <Progress
              className="h-4 bg-slate-900"
              value={(count / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button variant="premium" className="w-full rounded-xl">
            Upgrade
            <Zap className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Counter;
