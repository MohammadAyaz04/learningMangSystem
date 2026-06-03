import React,{useState} from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

const navigate=useNavigate();
const [input,setInput]=useState(data?data:'')
const searchHandler=(e)=>{
  e.preventDefault()
  navigate("/course-list/"+input)
}

  return (
    <div className='flex items-center max-w-xl w-full mt-8 px-4 sm:px-0'>
      <form onSubmit={searchHandler} action="" className='flex items-center w-full md:h-14 h-12 bg-white border border-gray-300 rounded-full pl-4 pr-1 shadow-sm'>
        <img src={assets.search_icon} alt="searchicon" className='w-4 md:w-5' />
        <input 
          type="text" 
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder='Search for courses' 
          className='w-full h-full outline-none text-gray-700 bg-transparent px-3 text-sm md:text-base placeholder-gray-400' 
        />
        <button 
          type='submit' 
          className='bg-blue-600 hover:bg-blue-700 transition-colors text-white md:px-6 px-4 h-9 md:h-11 rounded-full text-sm md:text-base font-medium'
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar