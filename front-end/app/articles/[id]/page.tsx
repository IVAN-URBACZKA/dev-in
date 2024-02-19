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
    <div>
      {article ? (
        <div>
          <h1>{article.name}</h1> 
          <p>{article.content}</p>
          <em>{article.createdAt}</em>
        </div>
      ) : (
        <p>Chargement de l'article...</p> 
      )}
    </div>
  );
};

export default Page;
