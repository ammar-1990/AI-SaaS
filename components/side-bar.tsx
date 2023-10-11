"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Settings,
} from "lucide-react";

type Props = {};

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});

const SideBar = (props: Props) => {
  const router = useRouter();

  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      href: "/image",
      color: "text-pink-700",
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      href: "/video",
      color: "text-orange-700",
    },
    {
      label: "Music Generation",
      icon: Music,
      href: "/music",
      color: "text-emerald-500",
    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      color: "text-green-700",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div className="p-6 px-4 flex flex-col h-full  w-full bg-gray-900">
      <div
        className="flex items-center gap-x-3 cursor-pointer w-min"
        onClick={() => router.push("/dashboard")}
      >
        <div className="relative w-12 h-12 ">
          <Image
            fill
            src={"/Mystic-logo.png"}
            alt="logo"
            className="object-contain"
          />
        </div>
        <p className={cn("text-white", montserrat.className)}>Mystic</p>
      </div>
      <div className="space-y-1 mt-12">
        {routes.map((route) => (
          <div
            key={route.href}
            onClick={() => router.push(route.href)}
            className={cn(
              "flex items-center gap-x-4 w-full group rounded-lg hover:bg-white/10 hover:text-white p-2 py-3 cursor-pointer transition text-white",
              pathname === route.href
                ? "bg-white/10 text-white"
                : "text-zinc-400"
            )}
          >
            <route.icon className={cn("w-4 h-4", route.color)} />
            <p className="text-sm ">{route.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
