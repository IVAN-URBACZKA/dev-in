"use client"
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ApiService from '@/services/ApiService';

interface Article {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  content: string;
}

const Page = ({ params }: { params: { slug: string } }) => {
 
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    ApiService.getArticle(params.slug)
      .then(response => {
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        console.log(data);
        setArticle(data);
      })
      .catch(error => console.log(error));
  }, [params.slug]); 

  return (
    <>
    <Header />
    <div className="bg-white pt-10 min-h-screen flex justify-center">
      <div className="max-w-4xl">
      {article ? (
       <div className='bg-white pt-10 min-h-screen'>
          <h1 className="text-5xl underline font-bold flex text-black justify-center  mt-5">{article.name}</h1>
          <em className="block text-right text-black text-sm">{new Date(article.createdAt).toLocaleDateString()}</em>
          <div className='flex mt-5 justify-center h-screen'>
              <p className="text-black whitespace-pre-line text-2xl ">{article.content}</p>
          </div>  
         
          </div>
      ) : (
        <p className="text-lg text-gray-500">Chargement de l'article...</p>
      )}
    </div>
    </div>
    
    </>
  );
};

export default Page;
