import { DIAGNOSIS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

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


    const sbURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sbAPI = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const geminiAPI = process.env.GEMINI_API_KEY;
    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
        apiKey: geminiAPI
    })
    const client = createClient(sbURL, sbAPI)

    const vectorStore = new SupabaseVectorStore(embeddings, {
        client,
        tableName: 'documents',
        queryName: 'match_documents'
    })



    const retrieverQuery = `
        A ${patientAge}-year-old ${patientGender} named ${patientName} presents with:
        - Symptoms: ${patientSymptoms}
        - Medical history: ${patientHistory}
        - Allergies: ${patientAllergies}
        - Vitals: ${patientVitals}
        - Current diagnosis: ${patientDiagnosis}
        - Weight: ${patientWeight} kg

        What guidance or treatment does the WHO recommend for this profile?`;

    const retriever = vectorStore.asRetriever({ k: 7 });

    const relevantDocs = await retriever.invoke(retrieverQuery);

    // console.log(relevantDocs);
    // console.log('succ');



    const PROMPT = DIAGNOSIS_PROMPT
        .replaceAll('{patientName}', patientName)
        .replaceAll('{patientAge}', patientAge)
        .replaceAll('{patientGender}', patientGender)
        .replaceAll('{patientHistory}', patientHistory)
        .replaceAll('{patientSymptoms}', patientSymptoms)
        .replaceAll('{patientAllergies}', patientAllergies)
        .replaceAll('{patientDiagnosis}', patientDiagnosis)
        .replaceAll('{patientVitals}', patientVitals)
        .replaceAll('{patientWeight}', patientWeight);

    const context = relevantDocs.map(doc => doc.pageContent).join("\n\n");

    const finalPrompt = PROMPT + `\n\nWHO Guidelines Context:\n${context}`;

    // console.log(finalPrompt);


    try {

        const openai = new OpenAI({
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
            apiKey: process.env.GEMINI_API_KEY,

        })

        const completion = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                { role: "user", content: finalPrompt }
            ],
        })
        console.log(completion.choices[0].message);
        return NextResponse.json(completion.choices[0].message);
    } catch (err) {
        console.log(err);
        return NextResponse.json(err);
    }
}