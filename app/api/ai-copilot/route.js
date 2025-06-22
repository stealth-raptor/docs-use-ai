import { COPILOT_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {

    const body = await req.json();

    const PROMPT = body.prompt + COPILOT_PROMPT;


    console.log(PROMPT);
    try {

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,

        })

        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
                { role: "user", content: PROMPT }
            ],
        })
        console.log(completion.choices[0].message);
        return NextResponse.json(completion.choices[0].message);

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: err.message || "Something went wrong" },
            { status: 500 }
        );
    }

}

