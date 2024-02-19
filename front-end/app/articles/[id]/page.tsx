"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
  id: number;
  name: string;
  createdAt: string;
  content: string;
}

const Page = ({ params }: { params: { id: string } }) => {
 
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/articles/${params.id}`) 
      .then(response => {
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        setArticle(data);
      })
      .catch(error => console.log(error));
  }, [params.id]); 

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {article ? (
        <div className="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{article.name}</h1>
          <p className="text-gray-700 text-base whitespace-pre-line">{article.content}</p>
          <em className="block text-right text-gray-500 text-sm">{new Date(article.createdAt).toLocaleDateString()}</em>
        </div>
      ) : (
        <p className="text-lg text-gray-500">Chargement de l'article...</p>
      )}
    </div>
  );
};

export default Page;
