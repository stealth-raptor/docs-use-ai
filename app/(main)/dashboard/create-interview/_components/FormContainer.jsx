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

const FormContainer = () => {
    return (
        <div className='p-5 bg-accent rounded-xl mt-5'>
            <h2 className='mt-2'>Job Position</h2>
            <Input placeholder='Senior Stormtrooper- Imperial Operations Division' className='mt-2' />

            <h2 className='mt-2'>Job Description</h2>
            <Textarea placeholder='Join the elite ranks of the Empire as a Senior Stormtrooper, where you’ll lead squads, enforce Imperial protocol, and occasionally hit your target. Perfect for those who thrive under pressure (and under helmets).' className='mt-2 h-[150px]' />

            <h2 className='mt-2'>Interview Duration</h2>
            <Select className='mt-2'>
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Darth Vader's Favourite" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="15">15 mins</SelectItem>
                    <SelectItem value="30">30 mins</SelectItem>
                    <SelectItem value="45">45 mins</SelectItem>
                    <SelectItem value="60">60 mins</SelectItem>
                </SelectContent>
            </Select>

            <h2 className='mt-2'>Interview Type</h2>
            <Select className='mt-2'>
                <SelectTrigger className="w-full mt-2 mb-2">
                    <SelectValue placeholder="Tie-Fighter Pilot" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioural">Behavioural</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>

            <Button className='mt-2 '>
                Generate Interview
            </Button>
        </div>
    )
}

export default FormContainer