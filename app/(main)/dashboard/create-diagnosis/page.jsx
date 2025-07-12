"use client"
import { ArrowLeft, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import { toast } from 'sonner'
import DiagnosisContainer from './_components/DiagnosisContainer'

const CreateDiagnosis = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    patientWeight: "",
    patientGender: "",
    patientHistory: "",
    patientAllergies: "",
    patientSymptoms: "",
    patientVitals: "",
    patientDiagnosis: "",
    patient_id: "", 
  });


  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))


  }

  const onGoToNext = () => {
    if (
      !formData?.patientName ||
      !formData?.patientAge ||
      !formData?.patientGender ||
      !formData?.patientHistory ||
      !formData?.patientSymptoms ||
      !formData?.patientAllergies ||
      !formData?.patientDiagnosis
    ) {
      toast(`⚠️ Kindly fill all the fields`);
      return;
    }

    // console.log(formData);
    setStep(step + 1);
  }

  return (
    <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
      <div className='flex gap-5 items-center'>
        <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
        <h2>Create New Diagnosis</h2>

      </div>
      {step == 1 ? <FormContainer formData={formData} onHandleInputChange={onHandleInputChange} GoToNext={() => onGoToNext()} />

        : step == 2 ? <DiagnosisContainer formData={formData} GoToNext={() => onGoToNext()} />

          : step == 3 ? <QuestionList formData={formData} />

            : null}
    </div>
  )
}

export default CreateDiagnosis