import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai"

export async function POST(req) {
    const {
        patientName,
        patientAge,
        patientGender,
        patientHistory,
        patientSymptoms,
        patientAllergies,
        patientDiagnosis,
        patientVitals,
        patientWeight
    } = await req.json();



    const PROMPT = QUESTION_PROMPT
        .replaceAll('{patientName}', patientName)
        .replaceAll('{patientAge}', patientAge)
        .replaceAll('{patientGender}', patientGender)
        .replaceAll('{patientHistory}', patientHistory)
        .replaceAll('{patientSymptoms}', patientSymptoms)
        .replaceAll('{patientAllergies}', patientAllergies)
        .replaceAll('{patientDiagnosis}', patientDiagnosis)
        .replaceAll('{patientVitals}', patientVitals)
        .replaceAll('{patientWeight}', patientWeight);

    console.log(PROMPT);

    try {

        const openai = new OpenAI({
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
            apiKey: process.env.GEMINI_API_KEY,

        })

        const completion = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                { role: "user", content: PROMPT }
            ],
        })
        console.log(completion.choices[0].message);
        return NextResponse.json(completion.choices[0].message);
    } catch (err) {
        console.log(err);
        return NextResponse.json(err);
    }
}