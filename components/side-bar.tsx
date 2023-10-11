"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});

const SideBar = (props: Props) => {
  const router = useRouter();

  return (
    <div className="p-6 flex flex-col h-full gap-y-4 w-full bg-gray-900">
      <div className="flex items-center gap-x-3 cursor-pointer w-min"
      onClick={()=>router.push('/dashboard')}
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
    </div>
  );
};

export default SideBar;
