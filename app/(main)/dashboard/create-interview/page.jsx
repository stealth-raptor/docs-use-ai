"use client"
import { ArrowLeft, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import { toast } from 'sonner'

const CreateInterview = () => {
  const [step,setStep]=useState(1);
    const router=useRouter();
    const [formData,setFormData]=useState();

    const onHandleInputChange=(field,value)=>{
      setFormData(prev=>({
        ...prev,
        [field]:value
      }))

      
    }

    const onGoToNext=()=>{
      if(!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.interviewType){
        toast(`⚠️ Kindly fill all the fields` )
        return ;
      }
      console.log(formData);
      setStep(step+1);
    }
  return (
    <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=> router.back()} className='cursor-pointer'/>
            <h2>Create New Interview</h2>
            
        </div>
        {step==1?<FormContainer onHandleInputChange={onHandleInputChange} GoToNext={()=>onGoToNext()}/>:step==2?<QuestionList formData={formData}/>:null}
    </div>
  )
}

export default CreateInterview