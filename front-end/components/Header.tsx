import React, { Component } from 'react';
import Link from 'next/link';

interface HeaderProps {}

interface HeaderState {}

export default class Header extends Component<HeaderProps, HeaderState> {
  logout = () => {
    localStorage.removeItem('token');
  };

  render() {
    const isLoggedIn = localStorage.getItem('token');

    return (
      <header className="mt-5 mb-5 bg-black">
        <div className="flex items-baseline mx-5">
          <div className="flex-grow flex justify-center items-baseline">
            <Link href={`/`} passHref>
              <h1 className="text-5xl cursor-pointer">👾 Ivan Urbaczka</h1>
            </Link>

            <nav className="ml-16">
              <ul className="flex flex-row space-x-2">
                <li className="text-2xl font-bold hover:bg-purple-900">
                  <a className="underline underline-offset-3" href="/archives">
                    Archives
                  </a>
                </li>
                <li className="text-2xl font-bold hover:bg-purple-900">
                  <a className="underline underline-offset-3" href="/contact">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            {isLoggedIn ? (
              <a href="" onClick={this.logout} className="text-xl hover:bg-purple-900">
                Se déconnecter
              </a>
            ) : (
              <a href="/login" className="text-xl hover:bg-purple-900">
                Se connecter
              </a>
            )}
          </div>
        </div>
      </header>
    );
  }
}