'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { supabase } from '@/services/supabaseClient';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PatientDashboard = () => {
    const params = useParams();
    const patientId = params?.id;
    const [patientData, setPatientData] = useState([]);
    const router = useRouter();

    const fetchId = async () => {
        const { data, error } = await supabase
            .from('Diagnosis')
            .select('*')
            .eq('patient_id', patientId);

        if (error || !data || data.length === 0) {
            toast('⚠️ No patient data found. Please try again.');
            router.push('/dashboard/patient');
        } else {
            setPatientData(data);
        }
    };


    useEffect(() => {
        if (patientId) fetchId();
    }, [patientId]);

    const latest = patientData?.[0]; 
    return (
        <div>
            <div className="px-10 md:px-24 lg:px-44 xl:px-56 py-8">
                <ArrowLeft onClick={() => router.back()} className="cursor-pointer mb-4" />
                <h2 className="text-2xl font-semibold mb-8 text-center">Patient Dashboard</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-4 text-center shadow-md">
                        <p className="text-gray-500 text-sm">Name</p>
                        <p className="text-lg font-medium">{latest?.patientName || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md">
                        <p className="text-gray-500 text-sm">Age</p>
                        <p className="text-lg font-medium">{latest?.patientAge || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md">
                        <p className="text-gray-500 text-sm">Gender</p>
                        <p className="text-lg font-medium capitalize">{latest?.patientGender || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md">
                        <p className="text-gray-500 text-sm">Weight</p>
                        <p className="text-lg font-medium">{latest?.patientWeight || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-2">
                        <p className="text-gray-500 text-sm mb-1">History</p>
                        <p className="text-base font-medium">{latest?.patientHistory || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-2">
                        <p className="text-gray-500 text-sm mb-1">Latest Diagnosis</p>
                        <p className="text-base font-medium">{latest?.patientDiagnosis || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-2">
                        <p className="text-gray-500 text-sm mb-1">Allergies</p>
                        <p className="text-base font-medium">{latest?.patientAllergies || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-2">
                        <p className="text-gray-500 text-sm mb-1">Latest Symptoms</p>
                        <p className="text-base font-medium">{latest?.patientSymptoms || '—'}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-2">
                        <p className="text-gray-500 text-sm mb-1">Total Visits</p>
                        <p className="text-base font-medium">{patientData?.length || 0}</p>
                    </Card>

                    <Card className="p-4 text-center shadow-md col-span-1 sm:col-span-2 lg:col-span-2">
                        <p className="text-gray-500 text-sm mb-1">Time Since Last Visit</p>
                        <p className="text-base font-medium">
                            {latest?.created_at
                                ? `${Math.floor((Date.now() - new Date(latest.created_at)) / (1000 * 60 * 60 * 24))} days ago`
                                : '—'}
                        </p>
                    </Card>

                    
                </div>


                {patientData?.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-6">Diagnosis History</h3>
                        <div className="space-y-6 border-l-2 border-muted pl-4">
                            {patientData
                                .map((entry, index) => (
                                    <div key={index} className="relative pl-4">
                                        <div className="absolute left-[-9px] top-1.5 w-3 h-3 bg-primary rounded-full" />

                                        <p className="text-sm text-gray-500">
                                            {new Date(entry.created_at).toLocaleString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>

                                        <div className="bg-card border border-muted rounded-lg shadow p-4 mt-2">
                                            <p className="text-base font-medium mb-1">
                                                <span className="text-muted-foreground">Diagnosis:</span>{' '}
                                                {entry.patientDiagnosis || '—'}
                                            </p>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium text-muted-foreground">Symptoms:</span>{' '}
                                                {entry.patientSymptoms || '—'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium text-muted-foreground">Vitals:</span>{' '}
                                                {entry.patientVitals || '—'} | <span className="font-medium">Weight:</span>{' '}
                                                {entry.patientWeight || '—'}
                                            </p>
                                            <Button onClick={()=>router.push(`/all-diagnosis/${entry.diagnosis_id}`)} className="px-6 py-3 rounded-md mt-2.5">
                                                View This Diagnosis
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center w-full">
                    <Button
                        onClick={() => router.push(`/dashboard/create-diagnosis?patientId=${patientId}`)}
                        className="px-6 py-3 rounded-md w-full"
                    >
                        Create New Diagnosis
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
