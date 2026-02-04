import React, { useState, useEffect } from 'react'
import { Copy, Check, Loader2, Volume2, VolumeX } from 'lucide-react';

const SummaryCard = ({ summary, isFetching, error }) => {

    const [copied, setCopied] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, [summary]);

    const handleCopy = () => {
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSpeak = () => {
        const synth = window.speechSynthesis;

        if (isSpeaking) {
            synth.cancel();
            setIsSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(summary);

        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        setIsSpeaking(true);
        synth.speak(utterance);
    };

    if (isFetching) return (
        <div className='flex justify-center items-center mt-10'>
            <Loader2 className='animate-spin text-blue-500' size={40} />
        </div>
    );

    if (error) return <p className='text-red-500 text-center mt-10'>Error loading summary. Please check the URL.</p>

    return summary && (
        <div className='mt-12 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold text-slate-300'>Summary</h2>
                <div className='flex gap-2'>
                    <button onClick={handleSpeak} className={`p-2 rounded-lg transition-all ${isSpeaking ? 'bg-blue-100 text-purple-600' : 'hover:bg-slate-100 text-slate-400'}`} title={isSpeaking ? "Stop listening" : "Listen to Summary"}>
                        {isSpeaking ? <VolumeX size={20}/> : <Volume2 size={20}/>}
                    </button>
                </div>
                <button onClick={handleCopy} className='p-2 hover:bg-slate-100 rounded-lg transition-colors'>
                    {copied ? <Check className='text-green-500' size={20} /> : <Copy className='text-slate-400' size={20} />}
                </button>
            </div>
            <div className='bg-slate-200 backdrop-blur-md p-8 rounded-2xl border border-slate-300'>
                <p className='text-slate-700 leading-8 text-lg font-serif'>{summary}</p>
            </div>
        </div>
    )
}

export default SummaryCard
