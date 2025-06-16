'use client'
import React from 'react'
import Welcome from './_components/Welcome'
import CreateOptions from './_components/CreateOptions'
import InterviewList from './_components/InterviewList'


const Dashboard = () => {
  return (
    <div>
      <Welcome/>
      <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions/>
      <InterviewList/>
    </div>
  )
}

export default Dashboard