import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });


const whoPDF = "./public/who.pdf";

const loader = new PDFLoader(whoPDF);

const docs = await loader.load();
// console.log(docs[455].pageContent);
const rawPages = docs.map(doc => doc.pageContent);
// console.log(rawPages[455]);

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 200,
    separators: ["\n\n", "\n", ".", " ", ""], // descending priority
});


const output = await splitter.createDocuments(rawPages);

const sbURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const sbAPI = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const geminiAPI = process.env.GEMINI_API_KEY;

const client = createClient(sbURL, sbAPI)

try {

    await SupabaseVectorStore.fromDocuments(
        output,
        new GoogleGenerativeAIEmbeddings({
            model: "text-embedding-004", // 768 dimensions
            taskType: TaskType.RETRIEVAL_DOCUMENT,
            title: "Document title",
            apiKey:geminiAPI
        }),
        {
            client,
            tableName: 'documents',
        }
    )
    console.log('succ');
} catch (e) {
    console.log(e);
}