"use client";
import Heading from "@/components/heading";
import { Music, VideoIcon } from "lucide-react";
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

type Props = {};

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
});

const VideoPage = (props: Props) => {

  

    const [video, setVideo] = useState<string>()

   


const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });



 async function onSubmit(values: z.infer<typeof formSchema>) {
try {
    
setVideo('')

const response = await axios.post('/api/video',values)

setVideo(response.data[0])

form.reset()


} catch (error) {
    console.log(error)
}finally{
router.refresh()
}

   
  }
  const isLoading = form.formState.isSubmitting;
  const isError = form.getFieldState("prompt").error;

  return (
    <div className="space-y-6">
      <Heading
        title="Video Generagtion"
        description="Turn your prompt to Video with Mystic"
        icon={VideoIcon}
        color="text-orange-500"
        bgColor="bg-orange-500/10"
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
                      placeholder="What would you like to wach..."
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
      <div className="spac-y-4 px-4 lg:px-8 max-h-[450px] overflow-y-auto myScroll">
        
        {isLoading &&(<div className="bg-muted mb-4 p-10 rounded-lg"><Loader/></div>)}
        {!video && !isLoading &&(<Empty label="No video generated" />)}
     {video&&<video controls className="w-full mt-8 aspect-video rounded-lg border bg-black">
<source src={video} />
     </video>}
      </div>
    </div>
  );
};

export default VideoPage;
