import { cn } from "@/lib/utils";
import Image from "next/image";
import { Montserrat } from "next/font/google";
interface EmptyStateProps {
  label: string;
}
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const EmptyState = ({ label }: EmptyStateProps) => {
  return (
    <div className="h-full p-4 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image priority alt="empty" fill src="waiting.svg" />
      </div>
      <p className={cn("text-sm text-center lg:text-lg", montserrat)}>
        {label}
      </p>
    </div>
  );
};

export default EmptyState;
