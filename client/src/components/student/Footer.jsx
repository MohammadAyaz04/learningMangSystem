import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 w-full mt-10">
      <div className="px-8 md:px-36 pt-12 pb-10 border-b border-gray-700 flex flex-col md:flex-row justify-between gap-10">
        
        {/* Left - Logo & Description */}
        <div className="md:w-1/3">
          <img src={assets.logo_dark} alt="Eduno Logo" className="w-32 mb-4" />
          <p className="text-sm text-white/70 leading-relaxed mt-4">
            Explore high-quality courses taught by industry experts, gain practical skills through hands-on learning, and achieve your personal and professional goals at your own pace, from anywhere in the world.
          </p>
        </div>

        {/* Middle - Company Links */}
        <div className="flex flex-col items-start">
          <h2 className="font-semibold text-white mb-4">Company</h2>
          <ul className="flex flex-col gap-2 text-sm text-white/70 text-left">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact us</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right - Newsletter */}
        <div className="md:w-1/3">
          <h2 className="font-semibold text-white mb-4 text-left">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/70 mb-4 text-left">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-gray-800 text-sm text-white/70 border border-gray-700 outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      <p className="text-center text-xs md:text-sm text-gray-500 py-6">
        © 2026 Eduno. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer