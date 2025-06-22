import { useUser } from '@/app/provider'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const QuestionListContainer = ({ questionList,onFinish }) => {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <div>
            <div ref={contentRef} className='p-5 bg-card border rounded-xl border-muted shadow-md mt-5 print-letterhead-space'>

                <h1 className='text-2xl font-bold mt-2 mb-2'>Prescription</h1>
                <h2><b>Patient Name:</b> {questionList.patient_name}</h2>
                <p><b>Patient Age:</b> {questionList.age}</p>
                <p><b>Patient Gender:</b> {questionList.gender}</p>
                <p><b>Patient Weight:</b> {questionList.weight}</p>
                <p><b>Patient Vitals:</b> {questionList.vitals}</p>
                <br />
                <hr />
                <br />
                <h4 className='font-bold'>Recommended Medications: </h4>
                <div>
                    {questionList.prescription?.medications?.map((med, index) => (
                        <p key={index}>
                            {med.generic_name} : {med.dosage_and_frequency} for {med.duration}
                        </p>
                    ))}
                </div>
                <br />

                <h4 className='font-bold'>Recommended Tests: </h4>

                <div>
                    {questionList.prescription?.recommended_tests?.map((test, index) => (
                        <p key={index}>
                            {test}
                        </p>
                    ))}
                </div>
                <br />
                <h4 className='font-bold'>Advice: </h4>
                <p>{questionList.prescription?.follow_up_advice}</p>
                <div>
                    {questionList.prescription?.diet_suggestions?.map((test, index) => (
                        <p key={index}>
                            {test}
                        </p>
                    ))}
                </div>
                <br />
                <h4 className='font-bold'>Notes: </h4>
                <div>
                    {questionList.prescription?.red_flags?.map((test, index) => (
                        <p key={index}>
                            {test}
                        </p>
                    ))}
                </div>
            </div>
            <div className='flex justify-start w-full gap-4 mt-2'>
            <Button onClick={onFinish} >Confirm Diagnosis</Button>
            <Button onClick={reactToPrintFn} >Print</Button>
            </div>
        </div>
    )
}

export default QuestionListContainer