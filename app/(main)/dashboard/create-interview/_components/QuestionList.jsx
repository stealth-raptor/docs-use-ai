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


const QuestionList = ({ formData ,onCreateLink }) => {

    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState();
    const [saveLoading,setSaveLoading]=useState(false);

    useEffect(() => {

        GenQuesList();
        console.log("Charlie Puth");
    }, [formData]);

    // useEffect(() => {
    //     axios.post('/api/test').then(res => {
    //         console.log("Response:", res.data);
    //     }).catch(e => {
    //         console.log("Error:", e);
    //     });
    // }, []);

//     const mockQuestions = [
//   {
//     question: "Describe a time you solved a technical challenge.",
//     type: "Behavioral",
//   },
//   {
//     question: "What is a hash map? How is it implemented?",
//     type: "Technical",
//   },
//   {
//     question: "Design a system that handles 100K user requests per second.",
//     type: "Technical",
//   },
// ];



    const GenQuesList = async () => {
        setLoading(true);
        try {
            // console.log("request sent")
            const result = await axios.post('/api/ai-model', {
                ...formData
            })
            // console.log("response received")
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
    const user=useUser();

    const onFinish = async () => {
        setSaveLoading(true);
        const interview_id=uuidv4();
        const { data, error } = await supabase
            .from('Interviews')
            .insert([
                {
                    ...formData,
                    questionList:questionList,
                    userEmail:user?.email,
                    interview_id:interview_id
                },
            ])
            .select()
            setSaveLoading(false);

            onCreateLink(interview_id);
    }

    console.log(questionList);

    return (
        <div>
            {loading && <div className='p-5 bg-accent rounded-xl border border-gray-100 flex gap-5 items-center mt-5'>
                <Loader2Icon className='animate-spin' />
                <div>
                    <h2 className='font-bold'>Executing Interview Plan 66...</h2>
                    <p className='text-gray-500'>I hope you liked the Star Wars Puns</p>
                </div>
            </div>
            }

            {questionList?.length > 0 &&
                <QuestionListContainer questionList={questionList}/>}

            <div className='flex justify-end mt-5'>
                <Button onClick={() => onFinish()} disabled={saveLoading}>{saveLoading&&<Loader2Icon className='animate-spin'/>}Finish</Button>
            </div>
        </div>
    )
}

export default QuestionList