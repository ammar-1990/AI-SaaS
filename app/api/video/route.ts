import { checkUserLimit, increaseApiCount } from "@/lib/increase-api-count";
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

if(!trialMode) return new NextResponse('Free trial expired',{status:403})

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });


  const response = await replicate.run(
    "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
    {
      input: {
        prompt: prompt
      }
    }
  );

  await increaseApiCount()
return NextResponse.json(response)

    } catch (error) {
        console.log('[POST_VIDEO_ERROR]',error)
        return new NextResponse('internal error',{status:500})
    }

}
