'use client'
import { Briefcase, BriefcaseMedical, Phone, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
    
    const CreateOptions = () => {
        const router=useRouter();
      return (
        <div >
            <div className='bg-accent flex flex-col rounded-xl p-5 cursor-pointer justify-center items-center' onClick={()=> router.push('/dashboard/create-diagnosis')}>
                <BriefcaseMedical className='p-3 text-primary bg-border rounded-xl h-12 w-12'/>
                <h2 className='font-bold mt-2'>Create New Diagnosis</h2>
                <p className='text-gray-400 mt-2'>Get started by creating a new Diagnosis</p>
            </div>
        </div>
      )
    }
    
    export default CreateOptions