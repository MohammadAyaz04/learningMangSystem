import React from 'react'
import { useContext,useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'
 import axios from 'axios';
 import { toast } from 'react-toastify';

const MyEnrollments = () => {

const {enrolledCourses,fetchUserEnrolledCourse,calculateCourseDuration,navigate,userData,backendUrl,getToken,calculateNoOfLectures}=useContext(AppContext)

const [progressArray,setProgressArray]=useState([])

const getCoursesProgress=async()=>{
  try {
    const token =await getToken();
    const tempProgressArray= await Promise.all(enrolledCourses.map(async(course)=>{
      const {data}=await axios.post(`${backendUrl}/api/user/get-course-progress`,{courseId: course._id},{headers:{Authorization:`Bearer ${token}`}})
      
    let totalLectures=calculateNoOfLectures(course);
    const lectureCompleted=data.progressData?data.progressData.lectureCompleted.length:0;

    return {totalLectures,lectureCompleted}
    }))
setProgressArray(tempProgressArray)
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
  if(userData){
    fetchUserEnrolledCourse()
  }
},[userData])


useEffect(()=>{
  if(enrolledCourses.length>0){
   getCoursesProgress()
  }
},[enrolledCourses])

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