import React from 'react'
import { NavLink } from 'react-router'

function Sidebar({setIsOpen}) {
  return (
    <div className='h-screen w-full bg-white dark:text-white text-black dark:bg-neutral border-r border-white/20 px-6 py-4 space-y-4'>
        <div className='flex justify-between'>
           <div>CodeYatra</div> 
           <div onClick={()=>setIsOpen(false)} className='btn btn-circle h-8 w-8 pb-0.5 text-xl'>x</div> 
        </div>
        <div className='flex flex-col pb-4 border-b border-white/20'>
            <NavLink to="/" className='hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-md'>Home</NavLink>
            <NavLink  to="/problemset" className='hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-md'>Problems</NavLink>
            <NavLink  to="/contest" className='hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-md'>Contest</NavLink>
            <NavLink to="/ai-interview" className='hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-md'>Ai Interviewer</NavLink>
            <NavLink to="/generate-resume" className='hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-md'>Generate Resume</NavLink>
            <NavLink to="/visualize-algo" className='hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-md'>DSA Visualizer</NavLink>
        </div>
    </div>
  )
}

export default Sidebar