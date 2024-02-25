"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'
import ApiService from '@/services/ApiService';

interface Article {
  name: string,
  content: string,
}

const UpdateForm = ({ params }: { params: { slug: string } }) => {

  const [article, setArticle] = useState<Article>({ name: '', content: '' });
  const router = useRouter();

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/')
    }
  
    
    if (params.slug) {
      ApiService.getArticle(params.slug)
        .then(response => {
          const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
          setArticle(data);
        })
        .catch(error => console.log(error));
    }
  }, [router, params.slug]); 
  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await ApiService.updateArticle(article);
      router.push('/')

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
  <div className="flex justify-center items-center h-screen">
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"> {/* Ajustez la largeur du formulaire si nécessaire */}
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
      <input
        type="text"
        id="name"
        name="name"
        value={article.name}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Contenu</label>
      <textarea
        id="content"
        name="content"
        value={article.content}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        style={{ minHeight: '300px' }} // Définissez une hauteur minimale ici
        rows={10}
      ></textarea>
    </div>

    <div className="flex items-center justify-between">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Modifier l'article
      </button>
    </div>
  </form>
</div>

    </>
  );
};

export default UpdateForm;
