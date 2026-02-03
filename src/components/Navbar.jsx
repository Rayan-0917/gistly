import { Github } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <div className='flex items-center gap-2'>   
            <div className='bg-linear-to-br from-blue-500 to-purple-600 p-2 rounded-lg'>
                <span className='text-white font-bold text-xl pl-5 pr-5'>Gistly</span>
            </div>
            <span className='font-satoshi font-bold text-xl tracking-wide text-gray-300'>AI Article Summarizer</span>
        </div>
        
        <button type='button' onClick={()=>window.open('https://github.com/Rayan-0917')} className='black_btn flex items-center gap-2 bg-black text-white px-5 py-1.5 rounded-full text-sm hover:bg-white hover:text-black border border-black transition-all'>
            <Github size={18}/>
        </button>
    </nav>
  )
}

export default Navbar
