'use client'
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const QuestionList = ({ formData }) => {

    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState();
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


    const GenQuesList = async () => {
        setLoading(true);
        try {
            console.log("request sent")
            const result = await axios.post('/api/ai-model', {
                ...formData
            })
            console.log("response received")
            console.log(result.data.content);
            const Content = JSON.parse(result.data.content);

            setQuestionList(Content);
            setLoading(false);
        } catch (e) {
            console.log(e);
            // toast('⚠️ Server Error, please try again later')
            // setLoading(false);
        }
    }

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
        </div>
    )
}

export default QuestionList