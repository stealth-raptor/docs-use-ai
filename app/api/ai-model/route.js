import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai"

export async function POST(req) {
    const { jobPosition, jobDescription, duration, interviewType } = await req.json();
    

    const PROMPT = QUESTION_PROMPT
        .replaceAll('{jobTitle}', jobPosition)
        .replaceAll('{jobDescription}', jobDescription)
        .replaceAll('{duration}', duration)
        .replaceAll('{type}', interviewType)


    try {

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,

        })

        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
            messages: [
                { role: "user", content: PROMPT }
            ],
            response_format: 'json'
        })
        console.log(completion.choices[0].message);
        return NextResponse.json(completion.choices[0].message)
    } catch (err) {
        console.log(err);
        return NextResponse.json(err);
    }
}