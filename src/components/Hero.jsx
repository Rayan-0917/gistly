import React from 'react'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col text-center'>
        <h1 className='text-5xl font-extrabold leading-[1.1] text-slate-400 sm:text-7xl'>
            Summarize Articles with <br />
            <span className='bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
                OpenAI GPT-4
            </span>
        </h1>
        <p className='mt-5 text-lg text-slate-200 max-w-2xl leading-relaxed'>
            Stop reading long essays. Get the gist of any newspaper article in seconds. 
            Paste a link below and let AI do the heavy lifting.
        </p>
    </header>
  )
}

export default Hero
