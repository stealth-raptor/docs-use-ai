import React from 'react'

const QuestionListContainer = ({questionList}) => {
    return (
        <div>
            <div className='p-5 border rounded-xl bg-accent mt-5'>
                {questionList.map((thang, index) => (
                    <div key={index} className='p-5 border rounded-xl mt-2'>
                        <h2 className='font-bold'>{thang.question}</h2>
                        <p className='text-sm text-gray-500 mt-1'>Type:{thang.type}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionListContainer