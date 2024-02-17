"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h3>{article.name}</h3>
          <p>Date de création : {article.createdAt}</p>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ArticlesPage;