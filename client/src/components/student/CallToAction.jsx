import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
 <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0 ">
  <h1 className="text-xl md:text-5xl font-semibold text-gray-800 leading-tight">
    Learn anything, anytime, anywhere
  </h1>
  <p className="text-gray-500 sm:text-sm">
    Whether you're starting from scratch or looking to level up your expertise, our courses provide the knowledge, guidance, and practical experience you need to succeed.
  </p>
  <div className="flex items-center font-medium gap-6 mt-4">
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200">
      Get started
    </button>
    <button className="flex items-center gap-2 text-blue-600 font-semibold hover:underline transition duration-200">
      Learn More <img src={assets.arrow_icon} alt="arrow_icon" className="w-4 h-4" />
    </button>
  </div>
</div>
  )
}

export default CallToAction