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
            <div className='article-card-container'>
              <ArticleCard
                id={article.id}
                slug={article.slug}
                name={article.name}
                content={article.content}
                createdAt={article.createdAt}
                onDelete={handleDelete}
                editPath={`update/${article.slug}`}
                isUserAuthenticated={true}
              />
            </div>
          </div>
        ))}

      </div>
    </>
  );


}

export default ArticlesPage;