import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DiagnosisContainer = ({formData, GoToNext}) => {
    const [loading, setLoading] = useState(false);
    const [list,setList]=useState();


    

    const GenDiagnosis = async () => {
        setLoading(true);
        try {
            console.log("request sent")
            const result = await axios.post('/api/ai-diagnoser', {
                ...formData
            })
            console.log("response received")
            const Content = result.data.content;
            const FINAL_JSON = JSON.parse(Content.replace("```json", "").replace("```", "").trim());
            setList(FINAL_JSON);
            // setQuestionList(mockQuestions);
            setLoading(false);
        } catch (e) {
            console.log(e);
            toast('⚠️ Server Error, please try again later')
            setLoading(false);
        }
    }

    const confirmThis=(diagnosis)=>{

        formData.patientDiagnosis=diagnosis;

        GoToNext();


    }

    useEffect(() => {
    
            GenDiagnosis();
            console.log("Charlie Puth");
        }, [formData]);

    return (
        <div>
            {loading && <div className='p-5  bg-card rounded-xl border border-muted shadow-md flex  gap-5 items-center mt-5'>
                <Loader2Icon className='animate-spin' />
                <div>
                    <h2 className='font-bold'>Generating Diagnosis</h2>
                </div>
            </div>
            }

            {list &&
                list.diagnoses.map((item,index)=>{
                    return (
                    <div key={index} className='p-5  bg-card rounded-xl border border-muted shadow-md  gap-5 mt-5 w-full'>
                        <h2><b>Diagnosis: </b>{item.diagnosis_name}</h2>
                        <h3><b>Confidence: </b>{item.confidence} %</h3>
                        <p><b>Reasoning: </b>{item.reasoning}</p>
                        <Button className='mt-1' onClick={()=>confirmThis(item.diagnosis_name)}>Confirm Diagnosis</Button>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default DiagnosisContainer