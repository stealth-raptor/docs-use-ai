'use client'
import { useUser } from '@/app/provider';
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useReactToPrint } from 'react-to-print';

const QuestionListContainer = ({ questionList, onFinish }) => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
    const user=useUser();
    const today=new Date();
  return (
    <div className="w-full">
      <div
        ref={contentRef}
        className="p-6 bg-card border border-muted rounded-xl shadow-md mt-5 space-y-5 print-letterhead-space"
      >
        <h1 className="text-2xl font-bold">Dr. {user.user.name}</h1>
        <h1 className="text-lg font-bold">Prescription-{today.toLocaleDateString()}</h1>

        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
          <p><b>Patient Name:</b> {questionList?.patient_name}</p>
          <p><b>Patient Age:</b> {questionList?.age}</p>
          <p><b>Patient Gender:</b> {questionList?.gender}</p>
          <p><b>Patient Weight:</b> {questionList?.weight}</p>
          <p className="sm:col-span-2">
            <b>Patient Vitals:</b> {questionList?.vitals}
          </p>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h2 className="font-semibold text-md text-gray-800 mb-1">Recommended Medications</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {questionList?.prescription?.medications?.map((med, index) => (
              <li key={index}>
                {med.generic_name} : {med.dosage_and_frequency} for {med.duration}
              </li>
            ))}
          </ul>
        </div>

        
        <div>
          <h2 className="font-semibold text-md text-gray-800 mb-1">Recommended Tests</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {questionList?.prescription?.recommended_tests?.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
        </div>

        
        <div>
          <h2 className="font-semibold text-md text-gray-800 mb-1">Advice</h2>
          <p className="text-sm text-gray-700 mb-1">{questionList?.prescription?.follow_up_advice}</p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {questionList?.prescription?.diet_suggestions?.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>

        
        <div>
          <h2 className="font-semibold text-md text-gray-800 mb-1">Seek Immediate Care If:</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {questionList?.prescription?.red_flags?.map((flag, index) => (
              <li key={index}>{flag}</li>
            ))}
          </ul>
        </div>
      </div>

      
      <div className="flex gap-4 mt-4 print:hidden">
        <Button onClick={onFinish}>Confirm Diagnosis</Button>
        <Button onClick={reactToPrintFn}>Print</Button>
      </div>
    </div>
  );
};

export default QuestionListContainer;
