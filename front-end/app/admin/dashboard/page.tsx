"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';


interface Article {
  id: number,
  name: string,
  slug: string,
  createdAt: string,
  content: string
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

  const handleDelete = (articleId: number) => {
    axios.post(`http://localhost:8000/article/${articleId}`)
      .then(() => {
        const updatedArticles = articles.filter(article => article.id !== articleId);
        setArticles(updatedArticles);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  return (
    <>
      <div>
        {articles.map((article) => (
          <div key={article.id} className='article-container text-center'>
            
            <div className='delete-link-container mt-5'>
           
              <a href="#" className="text-xl hover:bg-purple-900" onClick={(e) => { e.preventDefault(); handleDelete(article.id); }}>Delete</a>
            </div>
            <Link href={`update/${article.slug}`} passHref>
              <div className='article-card-link'>
               
                <ArticleCard id={article.id} slug={article.slug} name={article.name} content={article.content} createdAt={article.createdAt} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
  
}

export default ArticlesPage;