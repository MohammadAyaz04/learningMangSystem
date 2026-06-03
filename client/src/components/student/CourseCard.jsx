import React from 'react'
import { AppContext } from '../../context/AppContext'
import {useContext} from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {

  const {currency,calculateRating}=useContext(AppContext)

  return (
    <Link to={`/course/${course._id}`} onClick={()=> scrollTo(0,0)} className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'>
      <img className='w-full' src={course.courseThumbnail} alt="" />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-sm text-gray-500'>{course.educator.name}</p>
        <div className='flex items-center gap-2 mt-1'>
          <p className='font-medium'>{calculateRating(course)}</p>
          <div className='flex'>
            {[...Array(5)].map((_,i)=>(<img key={i} src={i<Math.floor(calculateRating(course))?assets.star:assets.star_blank} alt=''/>))}
          </div>
          <p className='text-gray-500 text-sm'>{course.courseRatings?.length ?? 0}</p>
        </div>
        <p className='text-base font-semibold text-gray-800 mt-2'>
          {currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

export default CourseCard