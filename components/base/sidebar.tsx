"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Counter from "./counter";
import { usePathname } from "next/navigation";
import { useTools } from "@/constants";
import { LayoutDashboard, Settings } from "lucide-react";
const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });
const montserratSemi = Montserrat({ subsets: ["latin"], weight: "600" });
const settings = {
  href: "/settings",
  label: "Settings",
  icon: Settings,
};
const dashboard = {
  href: "/ai",
  label: "Dashboard",
  icon: LayoutDashboard,
  color: "text-green-600",
};
const routes = useTools;
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
          <Link
            href={dashboard.href}
            key={dashboard.href}
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
              pathname === dashboard.href ? "bg-white/10" : ""
            )}
          >
            <div className="flex items-center flex-1">
              <dashboard.icon className={cn("w-5 h-5 mr-3", dashboard.color)} />
              <span className={montserratSemi.className}>
                {dashboard.label}
              </span>
            </div>
          </Link>
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
                <span className={montserratSemi.className}>{route.label}</span>
              </div>
            </Link>
          ))}
          <Link
            href={settings.href}
            key={settings.href}
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
              pathname === settings.href ? "bg-white/10" : ""
            )}
          >
            <div className="flex items-center flex-1">
              <settings.icon className={cn("w-5 h-5 mr-3")} />
              <span className={montserratSemi.className}>{settings.label}</span>
            </div>
          </Link>
        </div>
      </div>
      <Counter count={count} />
    </div>
  );
};

export default Sidebar;
