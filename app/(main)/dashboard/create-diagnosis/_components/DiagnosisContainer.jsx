import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


const DiagnosisContainer = ({ formData, GoToNext }) => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState();
    ChartJS.register(ArcElement, Tooltip, Legend);


    const mockQuestions = {
        "diagnoses": [
            {
                "diagnosis_name": "Type 2 Diabetes Mellitus",
                "confidence": 90,
                "reasoning": "Patient presents with fatigue, increased thirst, and has a known diabetic history"
            },
            {
                "diagnosis_name": "Coronary Artery Disease",
                "confidence": 80,
                "reasoning": "Exertional chest discomfort in a patient with hypertension and diabetes suggests cardiac origin"
            },
            {
                "diagnosis_name": "Diabetic Neuropathy",
                "confidence": 75,
                "reasoning": "Tingling and numbness in extremities are consistent with long-term diabetic complications"
            }
        ]
    };


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
            // setList(mockQuestions);
            setLoading(false);
        } catch (e) {
            console.log(e);
            toast('⚠️ Server Error, please try again later')
            setLoading(false);
        }
    }

    const confirmThis = (diagnosis) => {

        formData.patientDiagnosis = diagnosis;

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

                list.diagnoses.map((item, index) => {
                    return (
                        <div key={index} className='p-5  bg-card rounded-xl border border-muted shadow-md  gap-10   mt-5 w-full flex items-center'>
                            <div>
                                <h2 className='font-semibold text-2xl mb-1'>{item.diagnosis_name}</h2>
                                <h3><b>Confidence Rating: </b>{item.confidence} %</h3>

                                <p><b>Reasoning: </b>{item.reasoning}</p>
                                <Button className='mt-4' onClick={() => confirmThis(item.diagnosis_name)}>Confirm Diagnosis</Button>
                            </div>
                            <div className='relative w-[120px] h-[120px] mx-auto'>
                                <Doughnut
                                    data={{
                                        labels: [item.diagnosis_name],
                                        datasets: [
                                            {
                                                data: [item.confidence, 100 - item.confidence],
                                                backgroundColor: ['oklch(0.7357 0.1641 34.7091)', 'white'],
                                                borderWidth: 0,
                                            },
                                        ],
                                    }}
                                    options={{
                                        cutout: '75%',
                                        plugins: {
                                            legend: {
                                                display: false,
                                                text: 85
                                            },
                                        },
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800">
                                    {item.confidence}%
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default DiagnosisContainer