import React from 'react'
import Logo from '../Movielogo.jpg'
import {Link} from 'react-router'

const Navbar = () => {
  return (
    <div className='flex border space-x-8 pl-3 py-4 items-center'>
      <img className='w-[50px]' src = {Logo} ></img>
      <Link className = 'text-blue-400 text-2xl font-bold' to = '/'>Movies</Link>
      <Link className = 'text-blue-400 text-2xl font-bold' to='/watchlist'>Watchlist</Link>
    </div>
  )
}

export default Navbar
