'use client'
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from "next/navigation";




const QuestionList = ({ formData }) => {

    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState();
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {

        GenQuesList();
        console.log("Charlie Puth");
    }, [formData]);

    const mockQuestions = {
        "patient_name": "Rahul Sharma",
        "age": "35",
        "gender": "Male",
        "weight": "72kg",
        "vitals": "Temp: 101°F, BP: 130/85, SpO₂: 97%",
        "diagnosis": "Acute Upper Respiratory Tract Infection (URTI)",
        "prescription": {
            "medications": [
                {
                    "generic_name": "Paracetamol",
                    "brand_names": ["Calpol", "Crocin"],
                    "dosage_and_frequency": "500mg every 6 hours",
                    "duration": "3 days",
                    "purpose": "Fever and mild pain"
                },
                {
                    "generic_name": "Levocetirizine",
                    "brand_names": ["Levocet", "XYZAL"],
                    "dosage_and_frequency": "5mg once at night",
                    "duration": "5 days",
                    "purpose": "Runny nose and sneezing"
                },
                {
                    "generic_name": "Azithromycin",
                    "brand_names": ["Azithral", "Zithromax"],
                    "dosage_and_frequency": "500mg once daily",
                    "duration": "3 days",
                    "purpose": "Suspected bacterial infection"
                }
            ],
            "recommended_tests": [
                "CBC (Complete Blood Count)",
                "Throat swab culture"
            ],
            "follow_up_advice": "Visit after 3 days if symptoms persist or worsen.",
            "diet_suggestions": [
                "Drink warm fluids",
                "Avoid cold or spicy foods",
                "Eat soft, easy-to-digest meals"
            ],
            "red_flags": [
                "Persistent fever beyond 3 days",
                "Shortness of breath",
                "Severe throat pain with difficulty swallowing"
            ]
        },
        "note": "This is a clinical support suggestion only. Final prescription should be confirmed by the attending physician."
    };

    const onFinish = async () => {
        const diagnosis_id=uuidv4();
        console.log(user.user.email);
        console.log(formData);
        
        const { data, error } = await supabase
            .from('Diagnosis')
            .insert([
                {
                    ...formData,
                    diagnosis:questionList,
                    userEmail:user.user.email,
                    diagnosis_id:diagnosis_id,
                },
            ])
            .select()

    }



    const GenQuesList = async () => {
        setLoading(true);
        try {
            console.log("request sent")
            const result = await axios.post('/api/ai-model', {
                ...formData
            })
            console.log("response received")
            const Content = result.data.content;
            const FINAL_JSON = JSON.parse(Content.replace("```json", "").replace("```", "").trim());

            setQuestionList(FINAL_JSON);
            // setQuestionList(mockQuestions);
            setLoading(false);
        } catch (e) {
            console.log(e);
            toast('⚠️ Server Error, please try again later')
            setLoading(false);
        }
    }
    const user = useUser();

    // console.log(questionList);

    return (
        <div>
            {loading && <div className='p-5  bg-card rounded-xl border border-muted shadow-md flex  gap-5 items-center mt-5'>
                <Loader2Icon className='animate-spin' />
                <div>
                    <h2 className='font-bold'>Generating Diagnosis</h2>
                </div>
            </div>
            }

            {questionList &&
                <QuestionListContainer questionList={questionList} onFinish={onFinish}/>}
        </div>
    )
}

export default QuestionList