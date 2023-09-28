"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Settings,
} from "lucide-react";
import Counter from "./counter";
import { usePathname } from "next/navigation";
const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });
const routes = [
  {
    label: "Dashboard",
    href: "/ai",
    icon: LayoutDashboard,
    color: "text-sky-400",
  },
  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "text-violet-400",
  },
  {
    label: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    color: "text-yellow-400",
  },
  {
    label: "Music Generation",
    href: "/music",
    icon: Music,
    color: "text-pink-700",
  },
  {
    label: "Code Generation",
    href: "/code",
    icon: Code,
    color: "text-blue-400",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
interface SidebarProps {
  count: number;
}
const Sidebar = ({ count }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-800">
      <div className="px-3 py-2 flex-1">
        <Link href="/ai" className="flex items-center pl-3 mb-14">
          <div className="relative w-20 h-20 mr-4">
            <Image alt="Logo" src="/logo.svg" fill />
          </div>
          <h1 className={cn("text-3xl font-bold", montserrat.className)}>
            AI.betsy
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "bg-white/10" : ""
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                <span className={montserrat.className}>{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Counter count={count} />
    </div>
  );
};

export default Sidebar;
