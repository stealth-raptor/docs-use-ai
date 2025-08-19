'use client'
import React, { useEffect } from 'react'
import Welcome from './_components/Welcome'
import CreateOptions from './_components/CreateOptions'
import DiagnosisList from './_components/DiagnosisList'
import Clarity from '@microsoft/clarity';



const Dashboard = () => {

  useEffect(() => {
    Clarity.event("custom-event");
    console.log("Clarity event logged");
  }, [])
  return (
    <div>
      <Welcome />
      <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions />
      <DiagnosisList />
    </div>
  )
}

export default Dashboard