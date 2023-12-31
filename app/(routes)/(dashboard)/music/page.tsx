"use client";
import Heading from "@/components/heading";
import { Music } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useRouter} from 'next/navigation'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { Button } from "@/components/ui/button";
import { useState, useEffect} from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import useProModal from "@/hooks/pro-modal";
import toast from "react-hot-toast";

type Props = {};

 const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
});

const MusicPage = (props: Props) => {

  

    const [music, setMusic] = useState<string>()
    const {onOpen} = useProModal()

   


const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });



 async function onSubmit(values: z.infer<typeof formSchema>) {
try {
    
setMusic('')

const response = await axios.post('/api/music',values)

setMusic(response.data.audio)

form.reset()


} catch (error:any) {
    console.log(error)
    if(error?.response?.status ===403){
      onOpen()

    }else{
      toast.error('Something went wrong')
    }
}finally{
router.refresh()
}

   
  }
  const isLoading = form.formState.isSubmitting;
  const isError = form.getFieldState("prompt").error;

  return (
    <div className="space-y-6">
      <Heading
        title="Music Generagtion"
        description="Turn your prompt to music with Mystic"
        icon={Music}
        color="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "px-4 py-8 lg:px-6 rounded-lg border grid grid-cols-12 gap-2",
              isError && "border-rose-500"
            )}
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                    autoComplete="off"
                      disabled={isLoading}
                      placeholder="What would you like to hear..."
                      className="border-none focus-visible:ring-0 focus-visible:ring-transparent outline-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="lg:col-span-2 col-span-12"
              type="submit"
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="spac-y-4 px-4 lg:px-8 max-h-[450px] overflow-y-auto">
        
        {isLoading &&(<div className="bg-muted mb-4 p-10 rounded-lg"><Loader/></div>)}
        {!music && !isLoading &&(<Empty label="No music generated" />)}
     {music&&<audio controls className="w-full mt-8">
<source src={music} />
     </audio>}
      </div>
    </div>
  );
};

export default MusicPage;
