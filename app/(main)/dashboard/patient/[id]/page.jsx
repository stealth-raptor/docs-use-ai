'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { supabase } from '@/services/supabaseClient';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const page = () => {
    const params = useParams();
    const patientId = params?.id;
    const [patientData, setPatientData] = useState(null);

    const router=useRouter();


    const fetchId = async () => {
        let { data, error } = await supabase
            .from('Diagnosis')
            .select("*")
            .eq('patient_id', patientId)

        if (error) {
            toast("⚠️ Patient does not exist")
        } else {
            setPatientData(data);
            console.log(data);
        }
    }



    useEffect(() => {
        if (patientId) {
            fetchId();
        }
    }, [patientId]);


    return (
        <div>
            <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
                    <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                        <h2 className='text-2xl font-semibold mb-4 text-center'>Patient Dashboard</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-4 text-center shadow-md">
                        <p className="text-gray-500 text-sm">Name</p>
                        <p className="text-lg font-medium">{patientData?.[0]?.patientName || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md">
                        <p className="text-gray-500 text-sm">Age</p>
                        <p className="text-lg font-medium">{patientData?.[0]?.patientAge || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md">
                        <p className="text-gray-500 text-sm">Gender</p>
                        <p className="text-lg font-medium capitalize">{patientData?.[0]?.patientGender || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md">
                        <p className="text-gray-500 text-sm">Weight</p>
                        <p className="text-lg font-medium">{patientData?.[0]?.patientWeight || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-4">
                        <p className="text-gray-500 text-sm mb-1">History</p>
                        <p className="text-base font-medium">{patientData?.[0]?.patientHistory || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-2">
                        <p className="text-gray-500 text-sm mb-1">Allergies</p>
                        <p className="text-base font-medium">{patientData?.[0]?.patientAllergies || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-2">
                        <p className="text-gray-500 text-sm mb-1">Latest Symptoms</p>
                        <p className="text-base font-medium">{patientData?.[0]?.patientSymptoms || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-4">
                        <p className="text-gray-500 text-sm mb-1">Latest Diagnosis</p>
                        <p className="text-base font-medium">{patientData?.[0]?.patientDiagnosis || '—'}</p>
                    </Card>
                </div>

                <div className="mt-10 text-center">
                    <Button
                        onClick={() => router.push('/dashboard/create-diagnosis')}
                        className="px-6 py-3 rounded-md"
                    >
                        Create New Diagnosis
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default page