"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ApiService from '@/services/ApiService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = ({ params }: { params: { slug: string } }) => {
  const [, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }

    if (params.slug) {
      ApiService.getArticle(params.slug)
        .then(response => {
          const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
          formik.setValues(data);
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [router, params.slug]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Le nom est obligatoire'),
    content: Yup.string().required('Le contenu est obligatoire'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      content: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await ApiService.updateArticle(values);
        toast.success('Article mis à jour avec succès!', {
          onClose: redirectToHome,
        });
      } catch (error) {
        console.error(error);
        toast.error('La mise à jour a échoué.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const redirectToHome = () => {
    setTimeout(() => {
      router.push('/');
    }, 200);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-xs italic">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Contenu</label>
          <textarea
            id="content"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{ minHeight: '300px' }}
            rows={10}
          ></textarea>
          {formik.touched.content && formik.errors.content ? (
            <div className="text-red-500 text-xs italic">{formik.errors.content}</div>
          ) : null}
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Modifier l'article
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
