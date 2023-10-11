"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Menu } from "lucide-react";

import React from "react";

import SideBar from "./side-bar";
import { Button } from "./ui/button";

import { useState, useEffect} from 'react'

type Props = {};

const MobileSidebar = (props: Props) => {


    const [mounted, setMounted] = useState(false)
useEffect(()=>{setMounted(true)},[])

if(!mounted) return null 

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Button variant={'ghost'} size={"icon"}>
          {" "}
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0" style={{ color: "white" }}>
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
