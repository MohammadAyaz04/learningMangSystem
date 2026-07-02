import React from 'react'
import{useContext} from 'react';
import{AppContext} from '../../context/AppContext';
import humanizeDuration from 'humanize-duration';
import{assets} from '../../assets/assets';
import { Line } from 'rc-progress';
import {useParams} from 'react-router-dom';
import { useState } from 'react';
import {useEffect} from 'react'
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';
import Loading from '../../components/student/Loading';
 import axios from 'axios';
 import { toast } from 'react-toastify';
const Player = () => {

const{enrolledCourses,calculateChapterTime,fetchUserEnrolledCourse,backendUrl,getToken,userData}=useContext(AppContext);
const {courseId}=useParams();
const [courseData,setCourseData]=useState(null);
const [openSections,setOpenSections]=useState({});

const [playerData,setPlayerData]=useState(null);
const [progressData,setProgressData]=useState(null);
const[initialRating,setInitialRating]=useState(0);

const toggleSection=(index)=>{
  setOpenSections((prev)=>({
    ...prev,
    [index]:!prev[index]
  }))
}

const getCourseData = () => {
  enrolledCourses.map((course) => {
    if (course._id === courseId) {
      setCourseData(course);

      course.courseRatings.map((item) => {
        if (item.userId === userData._id) {
          setInitialRating(item.rating);
        }
      });
    }
  });
};

useEffect(() => {
  if (enrolledCourses.length > 0) {
     getCourseData();
  }
 
}, [enrolledCourses]);

console.log("courseId:", courseId);
console.log("enrolledCourses:", enrolledCourses);
console.log("playerData:", playerData);

const markLectureAsCompleted=async(lectureId)=>{
try {
  const token=await getToken();
  const {data}=await axios.post(backendUrl+'/api/user/update-course-progress',{courseId,lectureId},{headers:{Authorization:`Bearer ${token}`}})

  if(data.success){
    toast.success(data.message);
    getCourseProgress();
  }else{
    toast.error(data.message)
  }
} catch (error) {
  toast.error(error.message)
  
}
}

const getCourseProgress=async()=>{
  try {
      const token=await getToken();
  const {data}=await axios.post(backendUrl+'/api/user/get-course-progress',{courseId},{headers:{Authorization:`Bearer ${token}`}})
if(data.success){
  setProgressData(data.progressData)
}else{
  toast.error(data.message)
}

  } catch (error) {
     toast.error(error.message)
  }
}

const handleRate=async(rating)=>{
  try {
   const token=await getToken();
  const {data}=await axios.post(backendUrl+'/api/user/add-rating',{courseId,rating},{headers:{Authorization:`Bearer ${token}`}})
if(data.success){
 toast.success(data.message)
 fetchUserEnrolledCourse()
}else{
  toast.error(data.message)
}

  } catch (error) {
     toast.error(error.message)
  }
}

useEffect(()=>{
  getCourseProgress()
},[])


  return courseData? (
    <>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
      {/*left column*/}
      <div className='flex flex-col gap-5 text-gray-800'>
        <h2 className='text-xl font-semibold'>Course Structure</h2>

        <div >
          { courseData && courseData.courseContent.map((chapter,chapterindex)=>(
            <div key={chapterindex} className='border border-gray-300 bg-white mb-2 rounded-md p-3'>
              <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={()=>toggleSection(chapterindex)}>
                <div className='flex items-center gap-2'>
                  <img src={assets.down_arrow_icon} className={`w-5 h-5 transition-transform duration-300 ${openSections[chapterindex]?'rotate-180':''}`} alt="down_arrow_icon" />
                  <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                </div>
                <p className='md:text-default text-sm'>{chapter.chapterContent.length} {chapter.chapterContent.length>1?'Lectures':'Lecture'} - {calculateChapterTime(chapter)}</p>
              </div>

              <div className={`overflow-hidden transition-all duration-300 ${openSections[chapterindex]?'max-h-96':'max-h-0'}`}>
                <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                  {chapter.chapterContent.map((lecture,lectureindex)=>(
                    <li key={lectureindex} className='flex items-center justify-between gap-2 py-1'>
                      <div className='flex items-center gap-2'>
                        <img src={progressData && progressData.lectureCompleted.includes(lecture.lectureId)? assets.blue_tick_icon:assets.play_icon} alt="play_icon" className='w-4 h-4 mr-1'/>
                        <p className='text-gray-800 text-xs md:text-default'>{lecture.lectureTitle}</p>
                      </div>
                      <div className='flex items-center gap-2 text-xs md:text-default'>
                        {lecture.lectureUrl && <p onClick={()=>setPlayerData({...lecture, chapter:chapterindex+1,lecture:lectureindex+1})} className='text-blue-600 cursor-pointer' >Watch</p>}
                        <p className='text-gray-500'>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                      </div>
                    </li> 
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div> 
        <div className='bg-white'>
          <h1 className='text-xl font-bold mb-2'>Rate this course:</h1> <Rating initialRating={initialRating} onRate={handleRate} />
        </div>
      </div>

      {/*right column*/}
      <div className='md:mt-10'>
        {playerData? (
          <div >
       <YouTube
  videoId={playerData.lectureUrl.trim().split('/').pop().split('?')[0]}
  iframeClassName="w-full aspect-video"
/>
         <div className='flex justify-between items-center mt-1' >
          <p className='text-gray-600 font-medium md:text-base text-sm'>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
          <button onClick={()=>markLectureAsCompleted(playerData.lectureId)} className='bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800'>{progressData && progressData.lectureCompleted.includes(playerData.lectureId)?'Completed':'Incomplete'}</button>
         </div>
          </div>
        )
        :
        <img src={courseData? courseData.courseThumbnail:' '} alt="" /> 
        }
      </div>

    </div>
    <Footer/>
    </>
  ): <Loading/>
}

export default Player