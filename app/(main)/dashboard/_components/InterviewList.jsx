"use client"

import { Camera, Video } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';


const InterviewList = () => {
    const[interviewList,setInterviewList]=useState([]);
  return (
    <div className='my-5'>
        <h2 className='my-3 font-bold text-2xl'>Recently Created Interviews</h2>
        
        {interviewList?.length==0&&

        <div className=' p-5 flex flex-col gap-3 items-center bg-accent rounded-xl'>
            <Video className='p-3 text-primary bg-border rounded-xl h-12 w-12'/>
            <h2 className='font-bold mt-2'>You don't have any Interviews</h2>
            <Button className='mt-2'>Get Started</Button>
        </div>
        
        }
    </div>
  )
}

export default InterviewList