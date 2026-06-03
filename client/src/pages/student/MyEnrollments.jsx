import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'

const MyEnrollments = () => {

const {enrolledCourses,fetchUserEnrolledCourse,calculateCourseDuration,navigate}=useContext(AppContext)

const [progressArray,setProgressArray]=useState([
  {lectureCompleted:2,totalLectures:10},
  {lectureCompleted:5,totalLectures:15},
  {lectureCompleted:3,totalLectures:5},
  {lectureCompleted:10,totalLectures:10},
  {lectureCompleted:4,totalLectures:4},
  {lectureCompleted:9,totalLectures:18},
  {lectureCompleted:8,totalLectures:8},
  {lectureCompleted:6,totalLectures:20},
  {lectureCompleted:4,totalLectures:7},
  {lectureCompleted:10,totalLectures:12},
  {lectureCompleted:14,totalLectures:14},
  {lectureCompleted:3,totalLectures:6},
  {lectureCompleted:5,totalLectures:9},
  {lectureCompleted:13,totalLectures:13},
  {lectureCompleted:1,totalLectures:5}
])

  return (
    <>
   <div className='md:px-36 px-8 pt-10'>
    <h1 className='text-2xl font-semibold'>My Enrollments</h1>
    <table className='md:table-auto table-fixed w-full border mt-10 overflow-hidden'>
      <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
        <tr>
          <th className='px-4 py-3 font-semibold truncate'>Course</th>
          <th className='px-4 py-3 font-semibold truncate'>Duration</th>
          <th className='px-4 py-3 font-semibold truncate'>Completed</th>
          <th className='px-4 py-3 font-semibold truncate'>Status</th>
        </tr>
      </thead>
      <tbody className='text-gray-700'>
        {enrolledCourses.map((course,index)=>(
          <tr key={index} className='border-b border-gray-500/20'>
            <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
              <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28' />
              <div className='flex-1'>
                 <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                 <Line percent={progressArray[index] ? (progressArray[index].lectureCompleted/progressArray[index].totalLectures)*100 : 0} strokeWidth={2} strokeColor="#07B590" className='bg-gray-300 rounded-full'/> 
              </div>
            </td>
            <td className='px-4 py-3 max-sm:hidden'>
              <p>{calculateCourseDuration(course)}</p>
            </td>
            <td className='px-4 py-3 max-sm:hidden'>
             {progressArray[index] ? `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}` : '0/0'} <span> lectures</span>
            </td>
            <td className='px-4 py-3 max-sm:text-right'>
             <button className='border border-blue-500 text-blue-500 py-1.5 px-3 rounded text-sm' onClick={()=>navigate(`/player/${course._id}`)}>
              {progressArray[index] && progressArray[index].lectureCompleted/progressArray[index].totalLectures===1 ?'Completed': 'On Going'}</button>
            </td>
          </tr>))}
      </tbody>
    </table>
   </div>
   <Footer/>
   </>
  )
}

export default MyEnrollments