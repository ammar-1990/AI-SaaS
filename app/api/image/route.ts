import { auth } from "@clerk/nextjs";
import OpenAI from "openai";
import { NextResponse} from 'next/server'
import { checkUserLimit, increaseApiCount } from "@/lib/increase-api-count";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req:Request){


    try {
        
const { userId} = auth()
if(!userId) return new NextResponse("Unauthenticated",{status:401})

const {prompt, amount, resolution} = await req.json()

if(!prompt) return new NextResponse('No prompt entered',{status:404})
if(!amount) return new NextResponse('No amount entered',{status:404})
if(!resolution) return new NextResponse('No resolution entered',{status:404})


const trialMode = await checkUserLimit()

if(!trialMode) return new NextResponse('Free trial expired',{status:403})




const response = await openai.images.generate({
    prompt,
  n:parseInt(amount,10),
  size:resolution
  });

  await increaseApiCount()

return NextResponse.json(response.data)

    } catch (error) {
        console.log('[POST_IMAGE_ERROR]',error)
        return new NextResponse('internal error',{status:500})
    }

}
