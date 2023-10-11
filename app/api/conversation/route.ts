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

const {messages} = await req.json()

if(!messages) return new NextResponse('No messages entered',{status:404})

const response = await openai.chat.completions.create({
    model:'gpt-3.5-turbo',
    messages
})

return NextResponse.json(response.choices[0].message)

    } catch (error) {
        console.log('[POST_CONVERSATION_ERROR]',error)
        return new NextResponse('internal error',{status:500})
    }

}