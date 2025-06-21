'use client'

import React, { useState } from 'react'
import InterviewHeader from './_components/interviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'
const InterviewLayout = ({ children }) => {
  const [interviewInfo,setInterviewInfo]=useState();

  return (
    <InterviewDataContext.Provider value={{}}>
      <div>
        <InterviewHeader />
        {children}
      </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout