"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { tools } from "@/app/(routes)/(dashboard)/dashboard/page";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import useProModal from "@/hooks/pro-modal";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {};

const ProModal = (props: Props) => {
  const { isOpen, onClose } = useProModal();

  const [loading, setLoading] = useState(false)

const onSubscribe = async()=>{
  try {
    setLoading(true)
    const response = await axios.get('/api/stripe')

    window.location.href = response.data.url
  } catch (error) {
    toast.error('Something went wrong')
  }finally{
    setLoading(false)
  }
}

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-8 flex items-center justify-center gap-x-1">
            Upgrade to Mystic{" "}
            <Badge variant={"premium"} className="py-1 text-sm uppercase">
              pro
            </Badge>
          </DialogTitle>
          <DialogDescription className="">
            {tools.map((tool) => (
              <Card
                key={tool.href}
                className=" flex items-center justify-between p-3 border-black/5 border"
              >
                <div className="flex items-center gap-x-3">
                  <div
                    className={cn("p-3 rounded-lg", tool.bgColor, tool.color)}
                  >
                    <tool.icon className="w-4 h-4" />
                  </div>
                  <p className="font-bold">{tool.label}</p>
                </div>

                <Check className="w-5 h-5 text-primary" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubscribe} disabled={loading} className="w-full" variant={"premium"}>
            Upgrade <Zap className="w-4 h-4 fill-white ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
