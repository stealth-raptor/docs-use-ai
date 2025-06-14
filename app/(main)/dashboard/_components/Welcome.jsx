'use client '
import { useUser } from '@/app/provider'
import React from 'react'

const Welcome = () => {
    const {user}=useUser();
  return (
    <div>
        <div className='bg-accent p-3 rounded-2xl w-full'>
            <h2 className='text-lg font-bold'>Hello There ! {user?.name}</h2>
            <h2 className='text-secondary-foreground'>Insert Motivational Line Here !</h2>
        </div>
    </div>
  )
}

export default Welcome