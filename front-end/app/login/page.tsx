"use client"
import React, { useState, ChangeEvent, FormEvent, use, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

interface IUser {
    email: string;
    password: string;
  }

const LoginForm: React.FC = () => {

    const [user, setUser] = useState<IUser>({ email: '', password: '' });
    const [login, setLogin] = useState<boolean>(false);
    const router = useRouter(); 
    const token = localStorage.getItem('token');

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/')
      }
    }, [router] )
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8000/api/login', user);
          if(response.status === 200){
            setLogin(true);
            localStorage.setItem('token', response.data.token );
            router.push('/form/addarticle')
          }
          
        } catch (error) {
          console.error(error);
          
        }
      };

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };

     

    return (
        <>
         { !token  ? (<div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
     

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Se connecter
          </button>
        </div>
      </form>
    </div> ) : ( <p className="text-lg text-gray-500">VOUS ÊTEZ DEJA CONNECTER</p> )}
        </>
    );
};

export default LoginForm;