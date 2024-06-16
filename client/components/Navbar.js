import Image from 'next/image'
import React from 'react'
import DateTime from './DateTime'
Image
const Navbar = () => {
  return (


    <nav className="bg-white border-gray-200 ">
      <div className="flex flex-wrap items-center justify-between  p-4">
        <a href="/" className="flex items-center gap-1">
          <Image src='/gmeetlogo.svg' height={50} width={50}/>
          <p className="sm:inline-block self-center text-2xl font-semibold text-gray-700  whitespace-nowrap hidden">LinkUp 
           </p>
        </a>
        <div className='flex items-center'>

        <DateTime/>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center  w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokLinecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
