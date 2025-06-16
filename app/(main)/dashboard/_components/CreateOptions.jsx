'use client'
import { Phone, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
    
    const CreateOptions = () => {
        const router=useRouter();
      return (
        <div className=' grid grid-cols-2 gap-5'>
            <div className='bg-accent rounded-xl p-5 cursor-pointer' onClick={()=> router.push('/dashboard/create-interview')}>
                <Video className='p-3 text-primary bg-border rounded-xl h-12 w-12'/>
                <h2 className='font-bold mt-2'>Create New Interview</h2>
                <p className='text-gray-400 mt-2'>Get started by creating and scheduling a new Interview</p>
            </div>
            <div className='bg-accent rounded-xl p-5'>
                <Phone className='p-3 text-primary bg-border rounded-xl h-12 w-12 '/>
                <h2 className='font-bold mt-2'>Create Phone Screening Call</h2>
                <p className='text-gray-400 mt-2'>Get started by creating and scheduling a new Phone Screening Call</p>
            </div>
        </div>
      )
    }
    
    export default CreateOptions