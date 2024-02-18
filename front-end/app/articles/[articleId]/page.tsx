"use client"
import React from 'react';

interface Article {
  id: number;
  name: string;
  createdAt: string;
  content: string;
}


const ArticlePage = ({ articleId }: { articleId: string }) => {
  const [article, setArticle] = React.useState<Article | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/articles/${articleId}`);
      
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data: Article = await res.json();
        
        setArticle(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{article.name}</h1>
      <p>{article.createdAt}</p>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticlePage;
