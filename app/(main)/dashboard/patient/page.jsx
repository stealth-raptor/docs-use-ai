'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

function PatientPage() {
  const [patientId, setPatientId] = useState('');
  const router = useRouter();

  const handleFetch = async () => {
    if (!patientId) {
      toast.warning('⚠️ Please enter a patient ID');
      return;
    }
    router.push(`/dashboard/patient/${patientId}`);
  };

  return (
    <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
        <ArrowLeft onClick={() => router.back()} className='cursor-pointer self-start mb-6' />
      <div className="flex flex-col  items-center min-h-[70vh]">
        
        <h2 className='text-2xl font-semibold mb-4 text-center'>Enter Patient ID</h2>
        <Input
          placeholder='e.g. 123e4567-e89b-12d3-a456-426614174000'
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className='mb-4 max-w-md w-full'
        />
        <Button onClick={handleFetch} className="w-full max-w-md">Fetch Patient</Button>
      </div>
    </div>
  );
}

export default PatientPage;
