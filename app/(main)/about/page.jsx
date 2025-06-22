'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AboutPrescriptionAI = () => {

    const router=useRouter();
    return (
    <>
            <div className='flex gap-5 items-center'>
                <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                <h2>About the Project</h2>

            </div>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Card className="shadow-md rounded-xl border border-muted">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">About AI Prescription Generator</CardTitle>
                        <CardDescription className="text-muted-foreground mt-2">
                            A Clinical Decision Support Tool (CDST) that automatically generates prescription suggestions based on patient details and diagnosis.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 text-base text-muted-foreground">
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Overview</h2>
                            <p>
                                DoC.AI is a web-based application designed to assist doctors in quickly generating clinically sound prescriptions. By inputting patient vitals, symptoms, and preliminary diagnosis, the system suggests structured prescriptions that include medicines, tests, and follow-up advice.
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Features</h2>
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                                <li>Structured AI-based prescription suggestion (medicines, dosage, tests, red flags)</li>
                                <li>Patient history & record saving</li>
                                <li>Downloadable prescription view</li>
                                <li>Clean interface using ShadCN and TailwindCSS</li>
                            </ul>
                        </div>

                        <Separator />

                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Tech Stack</h2>
                            <p>
                                Built with <b>Next.js</b>, <b>React</b>, and <b>TailwindCSS</b>, styled using <b>ShadCN UI</b>. Backend and storage is powered by <b>Supabase/Postgres</b>. The AI logic is based on curated prescription logic with LLM-based reasoning.
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Objective</h2>
                            <p>
                                This tool was developed to simplify the clinical workflow by supporting doctors in generating prescriptions for common illnesses. It reduces repetitive typing, ensures consistency, and improves patient communication.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            </>
            );
};

            export default AboutPrescriptionAI;
