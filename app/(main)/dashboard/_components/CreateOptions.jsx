'use client'
import { Bot, Briefcase, BriefcaseMedical, ClipboardPlus, Phone, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
    
    const CreateOptions = () => {
        const router=useRouter();
      return (
        <div className='flex flex-row-2 w-full gap-5'>
            <div className='bg-card border border-muted shadow-md flex flex-col rounded-xl p-5 cursor-pointer justify-center items-center w-full' onClick={()=> router.push('/dashboard/create-diagnosis')}>
                <BriefcaseMedical className='p-3 text-primary bg-border rounded-xl h-12 w-12'/>
                <h2 className='font-bold mt-2'>Create New Patient</h2>
                <p className='text-gray-400 mt-2'>Get started by creating a new Patient</p>
            </div>
            <div className='bg-card border border-muted shadow-md flex flex-col rounded-xl p-5 cursor-pointer justify-center items-center w-full' onClick={()=> router.push('/dashboard/patient')}>
                <ClipboardPlus className='p-3 text-primary bg-border rounded-xl h-12 w-12'/>
                <h2 className='font-bold mt-2'>Select existing Patient</h2>
                <p className='text-gray-400 mt-2'>Get started by selecting an existing Patient</p>
            </div>
            <div className='bg-card border border-muted shadow-md flex flex-col rounded-xl p-5 cursor-pointer justify-center items-center w-full' onClick={()=> router.push('/copilot')}>
                <Bot className='p-3 text-primary bg-border rounded-xl h-12 w-12'/>
                <h2 className='font-bold mt-2'>Diagnosis Copilot</h2>
                <p className='text-gray-400 mt-2'>Validate your diagnosis with AI-backed Copilot</p>
            </div>
        </div>
      )
    }
    
    export default CreateOptions