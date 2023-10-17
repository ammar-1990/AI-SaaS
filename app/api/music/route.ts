import { checkUserLimit, increaseApiCount } from "@/lib/increase-api-count";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";

import { NextResponse} from 'next/server'
import Replicate from "replicate";




export async function POST(req:Request){


    try {
        
const { userId} = auth()
if(!userId) return new NextResponse("Unauthenticated",{status:401})

const {prompt} = await req.json()

if(!prompt) return new NextResponse('No messages entered',{status:404})

const trialMode = await checkUserLimit()
const isPro = await checkSubscription()

if(!trialMode && !isPro) return new NextResponse('Free trial expired',{status:403})


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });


  const response = await replicate.run(
    "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
    {
      input: {
        prompt_a:prompt
      }
    }
  );
if(!isPro){
  await increaseApiCount()
}


return NextResponse.json(response)

    } catch (error) {
        console.log('[POST_MUSIC_ERROR]',error)
        return new NextResponse('internal error',{status:500})
    }

}
