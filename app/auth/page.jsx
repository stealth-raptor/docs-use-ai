"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'

const page = () => {
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })

        if (error) {
            console.error('Error', error.message);
        }
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen '>
            <div className='flex flex-col items-center border rounded-2xl p-5'>
                <h2
                    width={400}
                    height={100}
                    className='w-[50px] mb-4 font-bold text-2xl'
                >DoC.AI</h2>
                <div className='flex flex-col items-center'>
                    <Image src='/login.svg' alt='login' width={600} height={400} className='w-[400px] h-[250px] border rounded-2xl'></Image>
                    <h2 className='text-2xl font-bold text-center mt-5'>Hello! Welcome to Doc</h2>
                    <p className=' text-center'>Sign In with Google</p>
                    <Button onClick={signInWithGoogle} className='mt-5 w-full '>Continue with Google</Button>
                </div>
            </div>
        </div>
    )
}

export default page