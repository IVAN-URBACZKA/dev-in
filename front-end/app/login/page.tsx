"use client"
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm: React.FC = () => {
    const router = useRouter(); 

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/')
      }
    }, [router])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email invalide').required('L\'email est obligatoire'),
            password: Yup.string().required('Le mot de passe est obligatoire'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:8000/api/login', values);
                if(response.status === 200){
                    localStorage.setItem('token', response.data.token);
                    router.push('/admin/addarticle');
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs italic">{formik.errors.email}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs italic">{formik.errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
