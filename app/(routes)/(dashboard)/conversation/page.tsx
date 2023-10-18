"use client";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
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

const ConversationPage = (props: Props) => {

  

    const [messages, setMessages] = useState<any[]>([])

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
    
const userMessage = {
    role:'user',
    content:values.prompt
}

const newMessages = [...messages,userMessage]
const response = await axios.post('/api/conversation',{messages:newMessages})

setMessages(prev=>[...prev,userMessage,response.data])

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
        title="Conversation"
        description="The mos advanced conversation model"
        icon={MessageSquare}
        color="text-violet-500"
        bgColor="bg-violet-500/10"
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
                      placeholder="Write your question"
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
        {!messages.length && !isLoading &&(<Empty label="No conversation started" />)}
       <div className="flex flex-col-reverse gap-y-4 items-start">
        {messages.map((message)=>(
        <div key={message.content} className={cn("flex items-center gap-x-8 p-8 rounded-lg ", message.role === 'user' ? 'border border-black/10' : 'bg-muted')}>
            {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
            <p className="text-sm">{message.content}</p>
            </div>
        ))}

       </div>
      </div>
    </div>
  );
};

export default ConversationPage;
