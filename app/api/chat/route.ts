import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {streamText} from "ai";
import {GOOGLE_KEY} from "@/app/config";


const google = createGoogleGenerativeAI({
    apiKey : GOOGLE_KEY,
})

export const maxDuration = 2;

export async function POST(req : Request){
    const { messages } = await req.json();

    console.log("from user",messages);

    const result = streamText({
        model : google("gemini-2.0-flash"),
        messages : messages,
        system : "Always give a concise answer not greater than 5 lines"
    })

    return result.toDataStreamResponse();

}