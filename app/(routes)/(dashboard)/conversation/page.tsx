"use client";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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

type Props = {};

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Write a question" }),
});

const ConversationPage = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
      <div className="spac-y-4 px-4 lg:px-8">
        Messages content
      </div>
    </div>
  );
};

export default ConversationPage;
