import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <>
      <header className='mt-5 mb-5 bg-black'  >

     <div className='flex justify-center space-x-16 items-baseline'>


        <h1 className='text-5xl'>👾 Ivan Urbaczka</h1>
       
        

         <nav >
          <ul className='flex flex-row space-x-2'>
            <li className='text-2xl font-bold'><a className=" underline underline-offset-3" href="/archives">Archives</a></li>
            <li className='text-2xl font-bold'><a className=" underline underline-offset-3" href="/contact">Contact</a></li>
          </ul>
         </nav>


         </div>
      </header>
      </>
    )
  }
}
