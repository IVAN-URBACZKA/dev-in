import React, { Component } from 'react'
import Link from 'next/link';


export default class Header extends Component {

  logout = () => {
    localStorage.removeItem('token'); // Supprime le token du localStorage
    window.location.href = '/login'; // Redirige vers la page de connexion
  };

  render() {
    return (
      <>
<header className='mt-5 mb-5 bg-black'>
  <div className='flex items-baseline mx-5'>

    <div className='flex-grow flex justify-center items-baseline'>
      <Link href={`/`} passHref>
        <h1 className='text-5xl cursor-pointer'>👾 Ivan Urbaczka</h1>
      </Link>
        
      <nav className='ml-16'>
        <ul className='flex flex-row space-x-2'>
          <li className='text-2xl font-bold'><a className="underline underline-offset-3" href="/archives">Archives</a></li>
          <li className='text-2xl font-bold'><a className="underline underline-offset-3" href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>

    <div>
     {localStorage.getItem('token') ? (
      <a href='' onClick={this.logout} className="text-xl hover:bg-purple-900">Se déconnecter</a>
     ) : ( 
      <a href="/login"  className="text-xl hover:bg-purple-900">Se connecter</a>
     )}
      
    </div>

  </div>
</header>

      </>
    )
  }
}
