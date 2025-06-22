"use client"
import { Input } from '@/components/ui/input'
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'

const FormContainer = ({ onHandleInputChange, GoToNext }) => {
    return (
        <div className='p-5 bg-card rounded-xl border border-muted shadow-md mt-5'>
            <h2 className='mt-2'>Patient Name</h2>
            <Input
                placeholder='e.g. Rahul Sharma'
                className='mt-2'
                onChange={(event) => onHandleInputChange('patientName', event.target.value)}
            />

            <h2 className='mt-2'>Patient Age</h2>
            <Input
                placeholder='e.g. 35'
                className='mt-2'
                onChange={(event) => onHandleInputChange('patientAge', event.target.value)}
            />

            <h2 className='mt-2'>Patient Weight</h2>
            <Input
                placeholder='e.g. 65kg'
                className='mt-2'
                onChange={(event) => onHandleInputChange('patientWeight', event.target.value)}
            />

            <h2 className='mt-2'>Patient Vitals</h2>
            <Input
                placeholder='e.g. Temp, BP, Heart Rate'
                className='mt-2'
                onChange={(event) => onHandleInputChange('patientVitals', event.target.value)}
            />

            <h2 className='mt-2'>Patient Gender</h2>
            <Select onValueChange={(value) => onHandleInputChange('patientGender', value)}>
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="e.g. Male, Female" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                </SelectContent>
            </Select>


            <h2 className='mt-2'>Patient History</h2>
            <Textarea
                placeholder='e.g. Diabetic for 5 years, no recent surgeries, history of seasonal allergies'
                className='mt-2 h-[100px]'
                onChange={(event) => onHandleInputChange('patientHistory', event.target.value)}
            />

            <h2 className='mt-2'>Patient Symptoms</h2>
            <Textarea
                placeholder='e.g. Fever for 3 days, sore throat, mild body ache'
                className='mt-2 h-[100px]'
                onChange={(event) => onHandleInputChange('patientSymptoms', event.target.value)}
            />

            <h2 className='mt-2'>Any Allergies</h2>
            <Textarea
                placeholder='e.g. Allergic to penicillin and sulfa drugs'
                className='mt-2 h-[100px]'
                onChange={(event) => onHandleInputChange('patientAllergies', event.target.value)}
            />

            <h2 className='mt-2'>Doctor's Diagnosis</h2>
            <Textarea
                placeholder='e.g. Suspected bacterial pharyngitis'
                className='mt-2 h-[100px]'
                onChange={(event) => onHandleInputChange('patientDiagnosis', event.target.value)}
            />

            <Button className='mt-4' onClick={() => GoToNext()}>
                Generate Diagnosis
            </Button>
        </div>
    )
}

export default FormContainer