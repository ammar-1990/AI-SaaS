import { auth } from "@clerk/nextjs";
import OpenAI from "openai";
import { NextResponse} from 'next/server'

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




const response = await openai.images.generate({
    prompt,
  n:parseInt(amount,10),
  size:resolution
  });



return NextResponse.json(response.data)

    } catch (error) {
        console.log('[POST_IMAGE_ERROR]',error)
        return new NextResponse('internal error',{status:500})
    }

}
