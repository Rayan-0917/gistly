import { ChevronRight, History, Trash2, X } from 'lucide-react'
import React from 'react'

const Sidebar = ({ history, onSelect, onDelete, onClearAll, isOpen, setIsOpen }) => {
    return (
        <aside className={`
      fixed md:relative z-40 
      w-80 bg-slate-700 border-r border-slate-600 h-screen overflow-y-auto p-6 
      flex flex-col transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:absolute md:left-0'} 
      ${!isOpen && 'md:hidden'} 
    `}>
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-2'>
                    <History className='text-blue-500' size={20} />
                    <h2 className='font-bold text-slate-300 uppercase tracking-wider text-sm'>History</h2>
                </div>
                <div className='flex items-center gap-2'>
                    {history.length > 0 && (
                        <button onClick={onClearAll} className='text-[10px] text-red-500 hover:text-red-600 font-bold uppercase tracking-tighter transition-colors'>
                            Clear History
                        </button>
                    )}
                    <button onClick={()=>setIsOpen(false)} className='text-slate-400 hover:text-white transition-colors'>
                        <X size={16}/>
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                {history.length > 0 ? (
                    history.map((item, index) => (
                        <div key={index} onClick={() => onSelect(item)} className='group relative flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all'>
                            <div className='mt-1'>
                                <ChevronRight className='text-slate-100 group-hover:text-blue-500' size={14} />
                            </div>
                            <div className='flex-1 overflow-hidden'>
                                <p className='text-xs font-medium text-slate-400 truncate pr-4'>
                                    {item.url}
                                </p>
                            </div>
                            <button onClick={(e) => onDelete(e, item.url)} className='absolute right-2 top-3 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity'>
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-10'>
                        <p className='text-slate-400 text-sm italic'>No recent summaries</p>
                    </div>
                )}
            </div>

        </aside>
    )
}

export default Sidebar
