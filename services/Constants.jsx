import { Calendar, LayoutDashboard, List, Settings, Wallet } from "lucide-react";

export const SidebarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Schedule an Interview',
        icon: Calendar,
        path:'/scheduled-interview'
    },
    {
        name:'All Interviews',
        icon:List,
        path:'/all-interview'
    },
    {
        name:'Payments',
        icon:Wallet,
        path:'/billing'
    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    }
];

export const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {jobTitle}

Job Description: {jobDescription}

Interview Duration: {duration}

Interview Type: {type}

Your task:

Analyze the job description to identify key responsibilities, required skills, and expected experience.

Generate a list of interview questions depends on interview duration

Adjust the number and depth of questions to match the interview duration.

Ensure the questions match the tone and structure of a real-life {type} interview.

Format:  
interviewQuestions = [  
  {  
    question: "",  
    type: "Technical" | "Behavioral"  
  },  
  {  
    ...  
  }  
]; 

Respond with nothing but the valid raw JSON object. Do NOT include backticks, markdown formatting, or extra text.

The goal is to create a structured, relevant, and time-optimized interview plan for a {jobTitle} role.`

