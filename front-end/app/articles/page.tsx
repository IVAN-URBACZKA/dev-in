"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';

interface Article {
  id: number;
  name: string;
  createdAt: string
  content: string;
}

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/articles')
      .then(response => {
        setArticles(JSON.parse(response.data));
       
      })
      .catch(error => console.log(error));
  }, []);


  return (
    <>
    <Header />
    <div>
      {articles.map((article) => (
       <ArticleCard name={article.name} content={article.content} createdAt={article.createdAt} />
      ))}
    </div>
    </>
  );
}

export default ArticlesPage;