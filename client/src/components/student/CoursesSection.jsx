import React from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import {useContext} from 'react'
import { AppContext } from '../../context/AppContext'

const CoursesSection = () => {

  const {allCourses}=useContext(AppContext);
  

  return (
    <div className='flex flex-col items-center justify-center text-center py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-semibold text-gray-800'>Learn from the best</h2>
      <p className='text-gray-500 md:text-base text-sm mt-3 max-w-2xl mx-auto'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our course are crafted to deliver results.</p>

<div className='grid grid-cols-auto md:px-0 md:my-16 my-10 gap-4'>
  {allCourses.slice(0, 4).map((course, index) => (
    <CourseCard course={course} key={index} />
  ))}
</div>

      <Link to={'/course-list'} onClick={()=>scrollTo(0,0)} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded-md hover:bg-gray-100 transition-colors mt-8'>Show all Courses</Link>
    </div>
  )
}

export default CoursesSection