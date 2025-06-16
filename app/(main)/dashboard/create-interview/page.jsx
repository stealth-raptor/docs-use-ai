"use client"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import FormContainer from './_components/FormContainer'

const CreateInterview = () => {
    const router=useRouter();
    const onHandleI
  return (
    <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=> router.back()} className='cursor-pointer'/>
            <h2>Create New Interview</h2>
            
        </div>
        <FormContainer/>
    </div>
  )
}

export default CreateInterview