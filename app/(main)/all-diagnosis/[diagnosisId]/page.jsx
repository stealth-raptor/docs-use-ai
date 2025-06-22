'use client'
import React, { use, useEffect, useState, } from 'react'
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, TriangleAlert } from 'lucide-react'


const DiagnosisId = () => {

    const params = useParams();
    const diagnosisId = params.diagnosisId;
    const router=useRouter();

    const [data, setData] = useState();



    useEffect(() => {
        const fetchDiagnosis = async () => {
            const { data, error } = await supabase
                .from('Diagnosis')
                .select("*")
                .eq('diagnosis_id', diagnosisId)
                .single(); // Assuming only one match

            if (error) {
                console.log(error);
                toast("⚠️ An error occurred, please try again later");
            } else {
                setData((data));
            }
        };

        if (diagnosisId) {
            fetchDiagnosis();
        }
    }, [diagnosisId]);


    return (
        <div>
            <div className='flex gap-5 items-center'>
                    <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                    <h2>Diagnosis</h2>
            
                  </div>
            {data ? (
                <>
                    <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
                    <div className='p-5 bg-card border border-muted shadow-md mt-5 print-letterhead-space rounded-xl'>
                        <h1 className='text-2xl font-bold mt-2 mb-2'>Prescription</h1>
                        <h2><b>Patient Name:</b> {data?.patientName}</h2>
                        <p><b>Patient Age:</b> {data?.patientAge}</p>
                        <p><b>Patient Gender:</b> {data?.patientGender}</p>
                        <p><b>Patient Weight:</b> {data?.patientWeight}</p>
                        <p><b>Patient Vitals:</b> {data?.patientVitals}</p>
                        <br />
                        <hr />
                        <br />
                        <h4 className='font-bold'>Recommended Medications: </h4>
                        <div>
                            {data.diagnosis?.prescription?.medications?.map((med, index) => (
                                <p key={index}>
                                    {med.generic_name}  {med.dosage_and_frequency} for {med.duration}
                                </p>
                            ))}
                        </div>
                        <br />

                        

                        <h4 className='font-bold'>Recommended Tests: </h4>

                        <div>
                            {data.diagnosis?.prescription?.recommended_tests?.map((test, index) => (
                                <p key={index}>
                                    {test}
                                </p>
                            ))}
                        </div>
                        <br />
                        <h4 className='font-bold'>Advice: </h4>
                        <p>{data.diagnosis?.prescription?.follow_up_advice}</p>
                        <div>
                            {data.diagnosis?.prescription?.diet_suggestions?.map((test, index) => (
                                <p key={index}>
                                    {test}
                                </p>
                            ))}
                        </div>
                        <br />
                        <h4 className='font-bold'>Notes: </h4>
                        <div>
                            {data.diagnosis?.prescription?.red_flags?.map((test, index) => (
                                <p key={index}>
                                    {test}
                                </p>
                            ))}
                        </div>

                </div>
                </div>
        </>
    ) : (
        <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
        <div className='p-5 bg-card border border-muted shadow-md flex gap-5 items-center mt-5'>
            <Loader2Icon className='animate-spin' />
            <div>
                <h2 className='font-bold'>Fetching Diagnosis</h2>
            </div>
        </div>
        </div>
    )
}
        </div >
    );

}

export default DiagnosisId