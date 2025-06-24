'use client '
import { useUser } from '@/app/provider'
import React from 'react'
import Image from 'next/image'

const Welcome = () => {
    const {user}=useUser();
  return (
    <div className='bg-card border border-muted shadow-md p-5 rounded-xl w-full flex justify-between items-center'>
        <div>
            <h2 className='text-lg font-bold'>Hello There! Dr. {user?.name}</h2>
            <h2 className='text-gray-400'>Hope you're having a productive day!</h2>
        </div>
        {user &&<Image src={user?.picture} alt='Avatar' width={50} height={50} className='rounded-full'></Image>}
    </div>
  )
}

export default Welcome