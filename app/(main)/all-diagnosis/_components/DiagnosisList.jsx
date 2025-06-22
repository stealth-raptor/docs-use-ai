'use client'
import React from "react";
import DiagnosisListContainer from "./DiagnosisListContainer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const DiagnosisList = ({ diagnosis }) => {
  const router = useRouter();
  return diagnosis && diagnosis.length ? (
    <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
      <span>
      <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
      <h2>All Diagnoses</h2>
      </span>
      <div className="grid grid-cols-2 gap-1">
        {diagnosis.map((data, key) => (
          <DiagnosisListContainer key={key} data={data} />
        ))}
      </div>
    </div>
  ) : (
    <div className='px-10 md:px-24 lg:px-44 xl:px-56'>
      <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
      <h2>All Diagnoses</h2>
      <div className="mt-10 text-center flex flex-col gap-4 justify-center items-center">
        
        <img src="none.svg" alt="No Diagnosis" height='250px' width='250px' className="" />
        <h2 className="text-lg font-semibold mb-2">You have not made any diagnosis yet</h2>
        <Button onClick={() => router.push('/dashboard/create-diagnosis')}>Get Started</Button>
      </div>
    </div>
  );
};

export default DiagnosisList;
