"use client";
import Heading from "@/components/heading";
import { Code } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
import ReactMarkdown from "react-markdown";
import useProModal from "@/hooks/pro-modal";
import toast from "react-hot-toast";

type Props = {};

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
});

const CodePage = (props: Props) => {
  const [messages, setMessages] = useState<any[]>([]);

  const {onOpen} = useProModal()

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code", { messages: newMessages });

      setMessages((prev) => [...prev, userMessage, response.data]);

      form.reset();
    } catch (error:any) {
      if(error?.response?.status ===403){
        onOpen()

      }else{
        toast.error('Something went wrong')
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  }
  const isLoading = form.formState.isSubmitting;
  const isError = form.getFieldState("prompt").error;

  return (
    <div className="space-y-6">
      <Heading
        title="Code Generation"
        description="Generate code with descriptive text"
        icon={Code}
        color="text-green-700"
        bgColor="bg-green-700/10"
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
                      placeholder="What code to generate  </>"
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
      <div className="spac-y-4 px-4 lg:px-8 ">
        {isLoading && (
          <div className="bg-muted mb-4 p-10 rounded-lg">
            <Loader />
          </div>
        )}
        {!messages.length && !isLoading && (
          <Empty label="No code generated" />
        )}
        <div className="flex flex-col-reverse gap-y-4 items-start">
          {messages.map((message) => (
            <div
              key={message.content}
              className={cn(
                "flex items-start gap-x-8 p-8 rounded-lg overflow-x-auto w-full",
                message.role === "user" ? "border border-black/10" : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2 p-2 bg-black/10 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code:({node,...props})=>(
                    <code className=" p-1 bg-black/10 rounded-lg"  {...props} />
                  )

               
                }}


                className={'text-sm overflow-hidden leading-7'}
              >
                {message.content || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodePage;
