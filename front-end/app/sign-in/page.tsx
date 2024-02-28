"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Le nom d\'utilisateur est obligatoire'),
  email: Yup.string().email('L\'email n\'est pas valide').required('L\'email est obligatoire'),
  password: Yup.string().required('Le mot de passe est obligatoire'),
});

const CreateUserForm: React.FC = () => {
  const [apiError, setApiError] = useState(''); 
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8000/user', values);
        console.log(response.data);
        setApiError(''); 
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setApiError(error.response.data.message || 'Une erreur est survenue lors de la création de l’utilisateur.');
        } else {
          setApiError('Une erreur est survenue lors de la connexion au serveur.');
        }
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={formik.handleSubmit} aria-labelledby="formTitle" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 id="formTitle" className="text-lg leading-6 font-medium text-gray-900">Créer un compte</h2>
        {apiError && <p role="alert" className="text-red-500 text-xs italic">{apiError}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            {...formik.getFieldProps('username')}
            aria-invalid={!!formik.errors.username}
            aria-describedby="usernameError"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.username && formik.errors.username && (
            <p id="usernameError" className="text-red-500 text-xs italic">{formik.errors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            {...formik.getFieldProps('email')}
            aria-invalid={!!formik.errors.email}
            aria-describedby="emailError"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.email && formik.errors.email && (
            <p id="emailError" className="text-red-500 text-xs italic">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            {...formik.getFieldProps('password')}
            aria-invalid={!!formik.errors.password}
            aria-describedby="passwordError"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.password && formik.errors.password && (
            <p id="passwordError" className="text-red-500 text-xs italic">{formik.errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Créer utilisateur
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
