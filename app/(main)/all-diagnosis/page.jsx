"use client"
import { useUser } from '@/app/provider'
import DiagnosisList from './_components/DiagnosisList';
import React, { use, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { supabase } from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TriangleAlert } from 'lucide-react'

const AllDiagnosis = () => {

    const [diagnosis, setDiagnosis] = useState([]);
    const user = useUser();

    useEffect(() => {
        const fetchData = async () => {
            let { data, error } = await supabase
                .from('Diagnosis')
                .select("*")
                .eq('userEmail', user.user.email);

            if (error) {
                console.log(error);
                toast("⚠️ There was an error. Please try again later");
            } else {
                setDiagnosis(data);
            }
        };

        if (user?.user?.email) {
            fetchData();
        }
    }, [user]);

    const router=useRouter();

    return (

        <div>
            <div className='flex gap-5 items-center'>
                    <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                    <h2>All Diagnoses</h2>
            
                  </div>
            <DiagnosisList diagnosis={diagnosis} />
        </div>
    )
}

export default AllDiagnosis