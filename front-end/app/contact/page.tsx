"use client"
import React, { Component } from 'react'

export default class page extends Component {
  render() {
    return (
      <div>

        <div className='flex flex-col items-center justify-center h-screen '>

            <div className='border-2 space-y-16 border-gray-300 p-32'>

            <h1 className='text-5xl font-bold'>IVAN URBACZKA</h1>

            <h2 className='text-3xl font-medium	'>Développeur Php/Symfony</h2>

            <p className='text-2xl text-center font-light	'>ivan.urbaczka(@)gmail.com</p>

            </div>

            <p className='mt-5'><a href="/">Revenir au blog</a></p>
            <p>⬇</p>
            

        </div>
        
      </div>
    )
  }
}
