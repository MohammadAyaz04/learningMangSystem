import React from 'react'
import {dummyEducatorData} from '../../assets/assets'
import { assets } from '../../assets/assets'
import {useContext} from 'react'
import {AppContext} from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'



const Navbar = () => {
  const educatorData =dummyEducatorData[0];
  const {user} =useUser()
  return (
    <div className='flex justify-between items-center px-4 md:px-8 border-b border-gray-500 py-3 '>
      <Link to="/" className='cursor-pointer'>
        <img src={assets.logo} alt="" />
        </Link>
        <div className='flex items-center gap-5 text-gray-500 relative'>
          <p>Hi! {user? user.fullName:'Developers'}</p>
          {user? <UserButton/> : <img src={assets.profile_img} alt="" className='max-w-8' />}
        </div>
     
     
    </div>
  )
}

export default Navbar