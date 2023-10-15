"use client";
import Heading from "@/components/heading";
import { ImageIcon, Download } from "lucide-react";
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
import Image from 'next/image'


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardFooter } from "@/components/ui/card";
import useProModal from "@/hooks/pro-modal";


type Props = {};

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  amount:z.string().min(1),
  resolution:z.string().min(1)
});

const amountOptions = [
    {
        value:'1',
        label:'1 Photo'
    },
    {
        value:'2',
        label:'2 Photos'
    },
    {
        value:'3',
        label:'3 Photos'
    },
    {
        value:'4',
        label:'4 Photos'
    },
    {
        value:'5',
        label:'5 Photos'
    }
]

const resolutionOptions = [
    {
        value:'256x256',
        label:'256x256'
    },
    {
        value:'512x512',
        label:'512x512'
    },
    {
        value:'1024x1024',
        label:'1024x1024'
    },
]


const ImagePage = (props: Props) => {

const [images, setImages] = useState<string[]>([])
const {onOpen} = useProModal()


  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount:"1",
      resolution:"512x512"
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      setImages([])
     
     
      const response = await axios.post("/api/image",values);

      const urls = response.data.map((image:{url:string})=>image.url)

      setImages(urls)
     
      form.reset();
    } catch (error:any) {
      console.log(error);
      if(error?.response?.status ===403){
        onOpen()

      }
    } finally {
      router.refresh();
    }
  }
  const isLoading = form.formState.isSubmitting;
  const isError = form.getFieldState("prompt").error;

  return (
    <div className="space-y-6">
      <Heading
        title="Image Generation"
        description="Train your imagination"
        icon={ImageIcon}
        color="text-pink-700"
        bgColor="bg-pink-700/10"
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
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl>
                    <Input
                      autoComplete="off"
                      disabled={isLoading}
                      placeholder="What is in your mind to generate..."
                      className="border-none focus-visible:ring-0 focus-visible:ring-transparent outline-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
              
            />

<FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-2">
             
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="outline-none focus-within:ring-0 focus-within:ring-transparent  focus:ring-0 focus:ring-transparent  ">
                    <SelectValue placeholder="How many images" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
             {amountOptions.map((variant)=><SelectItem key={variant.label} value={variant.value}>{variant.label}</SelectItem>)}
                </SelectContent>
              </Select>
           
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="resolution"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-2">
             
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="outline-none focus-within:ring-0 focus-within:ring-transparent  focus:ring-0 focus:ring-transparent  ">
                    <SelectValue placeholder="How many images" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
             {resolutionOptions.map((variant)=><SelectItem key={variant.label} value={variant.value}>{variant.label}</SelectItem>)}
                </SelectContent>
              </Select>
           
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
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!images.length && !isLoading && (
          <Empty label="No images generated" />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-3">
     {images.map((image)=>
     <Card 
     key={image}
     className="rounded-lg overflow-hidden"
     >
      <div className="relative aspect-square">
        <Image
        src={image}
        fill
        alt="img"
        className="object-contain"
        />

      </div>
      <CardFooter className="p-2">
        <Button
        onClick={()=>window.open(image)}
         variant={'secondary'}
         
         className="w-full ">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardFooter>


     </Card>)}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
