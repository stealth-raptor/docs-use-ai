"use client"

import { Camera, Hospital, Video } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


const DiagnosisList = () => {
  const router=useRouter();
  return (
    <div className='my-5 '>
        <h2 className='my-3 font-bold text-2xl'>Recently Created Diagnosis</h2>
        
        

        <div className=' p-5 flex flex-col gap-3 items-center bg-card rounded-xl border border-muted shadow-md'>
            <Hospital className='p-3 text-primary bg-border rounded-xl h-12 w-12'/>
            <h2 className='font-bold mt-2'>Recently created diagnosis</h2>
            <Button className='mt-2' onClick={()=> router.push('/all-diagnosis')}>Have a look</Button>
        </div>
        
        
    </div>
  )
}

export default DiagnosisList