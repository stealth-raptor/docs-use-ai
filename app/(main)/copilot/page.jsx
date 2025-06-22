
'use client'
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'

const Copilot = () => {
    const router = useRouter();
    const [formData, setFormData] = useState();

    const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

  }

    const [answer, setAnswer] = useState();
    const [loading, setLoading] = useState(false);

    const getAnswer = async () => {
        if (!formData) {
            toast('⚠️ Kindly fill all fields');
            return;
        }
        setLoading(true);
        try {
            console.log("request snet");
            console.log(formData);
            const result = await axios.post('/api/ai-copilot', { ...formData });
            console.log("response received");
            // const jsonparse=JSON.parse(result);
            const final = result.data.content;
            console.log(final);
            setAnswer(final);
            setLoading(false);

        } catch (error) {
            console.log(error);
            toast('⚠️ Server Error, please try again later')
            setLoading(false);
        }
    }


    return (
        <>
        {loading?<div className='px-10 md:px-24 lg:px-44 xl:px-56 h-fit'>
            <div className='flex gap-5 items-center'>
                <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                <h2>Copilot</h2>
            </div>
            <div className='p-5  bg-card rounded-xl border border-muted shadow-md flex  gap-5 items-center mt-5'>
                <Loader2Icon className='animate-spin' />
                <div>
                    <h2 className='font-bold'>Generating Diagnosis</h2>
                </div>
            </div>
        </div>:
        <div className='px-10 md:px-24 lg:px-44 xl:px-56 h-fit'>
            <div className='flex gap-5 items-center'>
                <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                <h2>Copilot</h2>
            </div>
            <div className='flex flex-col justify-center items-center mt-5 gap-2'>
                <div className='flex-1 overflow-y-auto px-6 py-4 space-y-4'>
                    <div className=' text-center text-lg  mb-4'>
                        Validate your diagnosis with confidence.
                    </div>

                    {answer && (
                        <div className='self-start bg-muted text-foreground p-3 rounded-xl w-full'>
                            {answer}
                        </div>
                    )}
                </div>
            {!answer&&
            <div className='static bottom-0 w-full flex flex-col gap-2 h-80'>
                    <Textarea
                        placeholder='Ask anything related to medicine & healthcare ...'
                        onChange={(event) => onHandleInputChange('prompt', event.target.value)}>

                    </Textarea>
                    <Button className='w-full' onClick={() => getAnswer()}>Submit</Button>
            </div>}
            </div>
        </div>}
        </>
    )
}

export default Copilot