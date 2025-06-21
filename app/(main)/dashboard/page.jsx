'use client'
import React from 'react'
import Welcome from './_components/Welcome'
import CreateOptions from './_components/CreateOptions'
import DiagnosisList from './_components/DiagnosisList'


const Dashboard = () => {
  return (
    <div>
      <Welcome/>
      <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions/>
      <DiagnosisList/>
    </div>
  )
}

export default Dashboard