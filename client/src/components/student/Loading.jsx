import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin'></div>
    </div>
  )
}

export default Loading