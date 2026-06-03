import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { useEffect,useState } from 'react'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import Youtube from "react-youtube";
const CourseDetails = () => {

  const {id}=useParams()

  const[courseData,setCourseData]=useState(null)
  const [openSections,setOpenSections]=useState({})
  const [isAlreadyEnrolled,setIsAlreadyEnrolled]=useState(false)
  const [playerData,setPlayerData]=useState(null)

  const{allCourses,navigate,calculateRating,calculateChapterTime,calculateCourseDuration,calculateNoOfLectures,currency}=useContext(AppContext);


  const fetchCourse=async()=>{
   const findCourse= await allCourses.find((item)=>item._id===id)
   setCourseData(findCourse)
  }

  useEffect(()=>{
    fetchCourse()
  },[allCourses])

const toggleSection=(index)=>{
setOpenSections((prev)=>(
  {...prev,
    [index]:!prev[index]
  }
))
}
  
  return courseData ?(
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>

      {/*left column*/}
      <div className='max-w-xl z-10 text-gray-500'>
        <h1 className='md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800'>{courseData.courseTitle}</h1>
        <p className='pt-4 md:text-base text-sm text-gray-600' dangerouslySetInnerHTML={{__html:courseData.courseDescription.slice(0,200)}}></p>
     
        {/*review and rating*/}
        <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
          <p className='font-medium'>{calculateRating(courseData)}</p>
          <div className='flex'>
            {[...Array(5)].map((_,i)=>(<img key={i} src={i<Math.floor(calculateRating(courseData))?assets.star:assets.star_blank} alt='' className='w-3.5 h-3.5'/>))}
          </div>
          <p className='text-blue-600 text-sm'>{courseData.courseRatings?.length ?? 0} {courseData.courseRatings?.length>1?'Ratings':'Rating'}</p>
          <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length>1?'Students':'Student'}</p>
        </div>

        <p className='pt-2'>Course by <span className='text-blue-600 underline'>Prof. Alex Carter</span></p>

        <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
           <div className='pt-5'>
             {courseData.courseContent.map((chapter,index)=>(
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded-md p-3'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={()=>toggleSection(index)}>
                  <div className='flex items-center gap-2'>
                    <img src={assets.down_arrow_icon} className={`w-5 h-5 transition-transform duration-300 ${openSections[index]?'rotate-180':''}`} alt="down_arrow_icon" />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='md:text-default text-sm'>{chapter.chapterContent.length} {chapter.chapterContent.length>1?'Lectures':'Lecture'} - {calculateChapterTime(chapter)}</p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${openSections[index]?'max-h-96':'max-h-0'}`}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture,index)=>(
                      <li key={index} className='flex items-center justify-between gap-2 py-1'>
                        <div className='flex items-center gap-2'>
                          <img src={assets.play_icon} alt="play_icon" className='w-4 h-4 mr-1'/>
                          <p className='text-gray-800 text-xs md:text-default'>{lecture.lectureTitle}</p>
                        </div>
                        <div className='flex items-center gap-2 text-xs md:text-default'>
                          {lecture.isPreviewFree && <p className='text-blue-600' onClick={()=>setPlayerData({videoId: lecture.lectureUrl.split('/').pop()})}>Preview</p>}
                          <p className='text-gray-500'>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='py-20 text-sm md:text-default'>
          <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
          <p className='pt-3 rich-text' dangerouslySetInnerHTML={{__html:courseData.courseDescription}}></p>
        </div>
      </div>

      {/*right column*/}
      <div className='max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
        {
              playerData? <Youtube videoId={playerData.videoId} opts={{playVars:{autoplay:1}}}iframeClassName="w-full aspect-video"/>
              :<img src={courseData.courseThumbnail || null} alt="" />
            }
            
        
        <div className='p-5'>
          <div className='flex items-center gap-2'>
            <img className='w-3.5' src={assets.time_left_clock_icon} alt="time left clock icon" />
          
            <p className='text-sm text-red-500'>5 days left at this price!</p>
          </div>

          <div className='flex gap-3 items-center pt-3'>
            <p className='md:text-4xl text-2xl font-semibold text-gray-800'>
              {currency} {(courseData.coursePrice - courseData.discount * courseData.coursePrice/100).toFixed(2)}
            </p>
            <p className='md:text-lg text-gray-500 line-through'>{currency} {courseData.coursePrice}</p>
            <p className='md:text-lg text-gray-500'>{courseData.discount}% off</p>
          </div>

          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
            <div className='flex items-center gap-1'>
              <img src={assets.star} alt="star icon" className='w-4 h-4'/>
              <p>{calculateRating(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-1'>
              <img src={assets.time_clock_icon} alt="clock icon" className='w-4 h-4'/>
              <p>{calculateCourseDuration(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-1'>
              <img src={assets.time_clock_icon} alt="clock icon" className='w-4 h-4'/>
              <p>{calculateNoOfLectures(courseData)} lessons</p>
            </div>
          </div>
          <button className={isAlreadyEnrolled?'mt-4 py-4 w-full rounded-md text-white font-semibold transition-all duration-300 bg-blue-800':'mt-4 py-4 w-full rounded-md text-white font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700'}>{isAlreadyEnrolled?' Already Enrolled':'Enroll now'}</button>
          <div className='pt-4'>
            <p className='text-gray-800 md:text-xl font-medium text-left w-full'>What's in the course?</p>
            <ul className='ml-4 pt-2 space-y-2 text-sm md:text-default  list-disc text-gray-500'>
              <li><img src={assets.download} alt="" />Liftime access with free updates</li>
              <li><img src={assets.download} alt="" />1 on 1 mentorship program</li>
              <li><img src={assets.download} alt="" />Quizzes to test your knowledge</li>
              <li><img src={assets.download} alt="" />Certificate of completion</li>
              <li><img src={assets.download} alt="" />30-day money-back guarantee</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
    <Footer/>
    </>
  ):<Loading/>
}

export default CourseDetails