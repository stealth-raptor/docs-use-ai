import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, Copy } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const InterviewLink = ({ interview_id, formData }) => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;

    const GetInterviewURL = () => {
        return url;

    }

    const onCopyLink=async()=>{
        await navigator.clipboard.writeText(url);
        toast("✅ Link Copied")
    }
    return (
        <div className='flex flex-col items-center justify-center mt-10'>
            <Check color='#59ca4e' size={100} />
            <h2 className='font-bold text-lg mt-4'>Your Interview is now Ready !</h2>
            <p className='mt-2'>A new interview Awakens...</p>
            <div className='w-full p-5 mt-6 rounded-xl bg-accent'>
                <div className='flex justify-between items-center'>
                    <h2 className='p-1 px-2 text-primary font-bold'>Interview Link</h2>

                </div>
                <div className='flex items-center mt-1 gap-4'>
                    <Input defaultValue={GetInterviewURL()} disabled={true} className='font-semibold ' />
                    <Button onClick={()=>onCopyLink()}><Copy />Copy Link</Button>
                </div>
                <hr className='mt-5 ' />
                <p className='mt-2 text-gray-500'>All the best — give it your best shot and may the Force be with you !
                </p>
            </div>
        </div>
    )
}

export default InterviewLink