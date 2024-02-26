"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ApiService from '@/services/ApiService';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
  name: Yup.string().required('Le nom est obligatoire'),
  content: Yup.string().required('Le contenu est obligatoire'),
});

const CreateArticleForm: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      name: '',
      content: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await ApiService.addArticle(values);
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.errors.name && formik.touched.name && <div className="text-red-500 text-xs italic">{formik.errors.name}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Contenu</label>
          <textarea
            id="content"
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{ minHeight: '300px' }}
            rows={10}
          ></textarea>
          {formik.errors.content && formik.touched.content && <div className="text-red-500 text-xs italic">{formik.errors.content}</div>}
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Créer l'article
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticleForm;
