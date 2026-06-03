import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-8 md:pt-14 text-center'>
      <p className='text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wider'>
        Trusted by learners from
      </p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 mt-5 md:mt-10 px-4'>
        <img src={assets.microsoft_logo} alt="Microsoft" className='w-20 md:w-28 h-auto object-contain' />
        <img src={assets.walmart_logo} alt="Walmart" className='w-20 md:w-28 h-auto object-contain' />
        <img src={assets.accenture_logo} alt="Accenture" className='w-20 md:w-28 h-auto object-contain' />
        <img src={assets.adobe_logo} alt="Adobe" className='w-20 md:w-28 h-auto object-contain' />
        <img src={assets.paypal_logo} alt="PayPal" className='w-20 md:w-28 h-auto object-contain' />
      </div>
    </div>
  )
}

export default Companies