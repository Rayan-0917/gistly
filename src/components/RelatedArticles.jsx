import React from 'react'

const RelatedArticles = ({articles, isFetching}) => {

    if(isFetching) return (
        <div className='mt-10 text-slate-400'>Finding similar stories...</div>
    );

    if(!articles || articles.length===0) return null;  

  return (
    <div className='mt-16 w-full max-w-4xl pb-20'>
      <h3 className='text-xl font-bold text-slate-300 mb-6 border-l-4 border-blue-500 pl-4'>
        Related Reading
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {articles.map((article, i)=>(
            <a key={i} href={article.url} target='blank' rel="noreferrer" className='group block bg-white border border-slate-100 p-4 rounded-xl hover:shadow-lg transition-all'>
                {(article.image || article.urlToImage) && (
                    <img src={article.image || article.urlToImage} alt="news" className='w-full h-32 object-cover rounded-lg mb-3'/>
                )}
                <p className='text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1'>
                    {article.source?.name || 'News'}
                </p>
                <h4 className='font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600'>
                    {article.title}
                </h4>
            </a>
        ))}
      </div>
    </div>
  )
}

export default RelatedArticles
