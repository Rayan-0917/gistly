import React, {useState, useEffect} from 'react'
import { useLazyGetSummaryQuery } from './services/articles.js';
import { useLazyGetRelatedArticlesQuery } from './services/News.js';
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import SummaryCard from './components/SummaryCard.jsx'
import RelatedArticles from './components/RelatedArticles.jsx'
import Sidebar from './components/Sidebar.jsx';
import { ArrowUp, Link2, Menu } from 'lucide-react'


const App = () => {
  
  const [articleUrl, setArticleUrl]=useState('');
  const [summaryData, setSummaryData]=useState({summary: '', related: [] });
  const [history, setHistory]=useState([]);
  const [isSidebarOpen, setIsSidebarOpen]=useState(false);

  const [getSummary, {isFetching: fetchingSummary, error: summaryError}] = useLazyGetSummaryQuery();
  const [getRelated, {isFetching: fetchingNews}]=useLazyGetRelatedArticlesQuery();


  useEffect(()=>{
    const savedHistory=JSON.parse(localStorage.getItem('article_history')) || [];
    setHistory(savedHistory);
  }, [])

  const handleSummarize=async(e)=>{
    e.preventDefault();

    const existingEntry=history.find((item)=>item.url===articleUrl);
    if(existingEntry){
      setSummaryData({
        summary: existingEntry.summary,
        related: existingEntry.related,
      });
      return;
    }

    const {data}=await getSummary({articleUrl});

    if(data?.summary){
      const query=data.summary.split(' ').slice(0, 3).join(' ');
      const newsResult=await getRelated(query);

      const newEntry={
        url: articleUrl,
        summary: data.summary,
        related: newsResult.data?.articles || [],
      };

      const updatedHistory=[newEntry, ...history];
      setHistory(updatedHistory);

      setSummaryData({
        summary: data.summary,
        related: newsResult.data?.articles || []
      });

      localStorage.setItem('article_history', JSON.stringify(updatedHistory));
    }
  };

  const handleSelectHistory=(item)=>{
    setArticleUrl(item.url);
    setSummaryData({
      summary: item.summary,
      related: item.related,
    });
  };

  const handleDeleteItem=(e, url)=>{
    e.stopPropagation();
    const updatedHistory=history.filter((item)=>item.url!==url);
    setHistory(updatedHistory);
    localStorage.setItem('article_history', JSON.stringify(updatedHistory));
  };

  const handleClearAll=()=>{
    setHistory([]);
    localStorage.removeItem('article_history');
  };

  return (
    <main className='min-h-screen bg-slate-800 font-satoshi flex flex-col md:flex-row relative'>
      {!isSidebarOpen && (
        <button onClick={()=>setIsSidebarOpen(true)} className='fixed top-5 left-5 z-50 p-2 bg-slate-700 border border-slate-600 rounded-lg text-white md:flex items-center gap-2 hover:bg-slate-600 transition-all'>
          <Menu size={20}/>
        </button>
      )}
      <Sidebar history={history} onSelect={handleSelectHistory} onDelete={handleDeleteItem} onClearAll={handleClearAll} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>

      {isSidebarOpen && (
        <div className='fixed inset-0 bg-black/50 z-30 md:hidden' onClick={()=>setIsSidebarOpen(false)}></div>
      )}
      <div className={`flex-1 max-h-screen overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'}`}>
        <div className='max-w-4xl mx-auto flex flex-col items-center px-6'>
        <Navbar/>
        <Hero/>

        <section className='mt-12 w-full max-w-4xl'>
          <form onSubmit={handleSummarize} className='relative group'>
            <Link2 className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500' size={20}/>
            <input type="url" placeholder='Paste article link' className='w-full bg-white border border-slate-200 py-4 pl-12 pr-16 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium' value={articleUrl} onChange={(e)=>setArticleUrl(e.target.value)} required />
            <button type='submit' className='absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors'>
              <ArrowUp size={14}/>
            </button>
          </form>
        </section>

        <SummaryCard summary={summaryData.summary} isFetching={fetchingSummary} error={summaryError}/>
        <RelatedArticles articles={summaryData.related} isFetching={fetchingNews}/>
      </div>
      </div>
      
    </main>
  )
}

export default App
