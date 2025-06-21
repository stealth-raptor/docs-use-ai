'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'

const Interview = () => {
    const { interview_id } = useParams();

    const [interviewData, setInterviewData] = useState();
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false);

    const{interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);

    const router=useRouter();

    useEffect(() => {
        if (interview_id) {
            getInterviewDetail();
        }
    }, [interview_id])

    const getInterviewDetail = async () => {
        try {
            setLoading(true);
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select("jobPosition,duration")
                .eq('interview_id', interview_id)
            setInterviewData(Interviews[0]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast('⚠️ Interview does not exist')
        }
    }

    const onJoinInterview = async() => {
        setLoading(true);
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('interview_id',interview_id)

        // console.log(Interviews[0]);
        setInterviewInfo({
            username:username,
            InterviewData:Interviews[0].questionList
        });
        router.push('/interview'+interview_id+'/start')
        setLoading(false);
    }

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
            <div className='flex flex-col items-center justify-center border rounded-xl bg-accent p-7 lg:px-32 xl:px-52'>
                <Image src={'/vercel.svg'} alt='logo' width={200} height={100} className='w-[40px] mt-3' />

                <h2 className='mt-3 font-bold text-2xl '>Artificially Intelligent Interviews</h2>

                <Image src={'/sendhelp.svg'} alt='image' width={500} height={500} className='w-[250px] my-6 '></Image>

                <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
                <h2 className='text-gray-500 mt-1'>{interviewData?.duration} mins</h2>

                <div className='flex justify-center items-center gap-2 w-full mt-3'>
                    <h2>Full Name</h2>
                    <Input placeholder='e.g. Luke Skywalker' onChange={(event) => setUsername(event.target.value)}></Input>
                </div>

                <Button className='mt-5 w-full font-bold' disabled={loading || !username} onClick={() => onJoinInterview()}><Video />{loading&&<Loader2Icon/>} Join Now</Button>
            </div>
        </div>
    )
}

export default Interview