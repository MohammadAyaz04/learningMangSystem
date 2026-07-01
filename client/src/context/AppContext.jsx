import { createContext, useContext, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {useAuth,useUser} from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();
export const AppContextProvider = (props) => {

const currency=import.meta.env.VITE_CURRENCY;
const navigate=useNavigate()
const backendUrl=import.meta.env.VITE_BACKEND_URL

const {getToken}=useAuth()
const {user}=useUser()

const[allCourses,setAllCourses]=useState([]);
const[isEducator,setIsEducator]=useState(false)
const [enrolledCourses,setEnrolledCourse]=useState([])
const [userData,setUserData]=useState(null)

//fetch all courses
const fetchAllCourse=async()=>{
  try {
    const {data}=await axios.get( backendUrl+'/api/courses/all')

    if(data.success){
        setAllCourses(data.courses)
    }else{
        toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
 
}

//fetch userdata
const fetchUserData= async(req,res)=>{
    if(user.publicMetadata.role==='educator'){
        setIsEducator(true);
    }
    try {
        const token= await getToken();
      const {data}=  await axios.get(backendUrl+'/api/user/data',{headers:{Authorization:`Bearer ${token}`}})
if(data.success){
    setUserData(data.user)
}else{
    toast.error(data.message)
}

    } catch (error) {
        toast.error(error.message)
    }
}

//func to cal avg rating of courses
const calculateRating=(course)=>{
    if(!course.courseRatings || course.courseRatings.length===0){
        return 0;
    }
    let totalRating=0;
    course.courseRatings.forEach(rating=>{
        totalRating+=rating.rating
    })
    return Math.floor(totalRating/course.courseRatings.length);
}

//func to cal Course CHapter time
const calculateChapterTime=(chapter)=>{
  let time=0;
  chapter.chapterContent.map((lecture)=>time +=lecture.lectureDuration)
  return humanizeDuration(time*60*1000,{units:['h','m']})
}

//func to cal course Duration
const calculateCourseDuration=(course)=>{
    let time=0
    course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
    return humanizeDuration(time*60*1000,{units:['h','m']})
}

//func to cal total no. of lec in the course
const calculateNoOfLectures=(course)=>{

    let totalLectures=0;
    course.courseContent.forEach((chapter)=>{
       if(Array.isArray(chapter.chapterContent)){
        totalLectures+=chapter.chapterContent.length;
       }
    })
    return totalLectures;
}
//func to fetch user enrolled courses
const fetchUserEnrolledCourse= async()=>{
    try {
        const token=await getToken();
    const {data}=await axios.get(backendUrl+'/api/user/enrolled-courses',{headers:{Authorization:`Bearer ${token}`}})

    if(data.success){
        setEnrolledCourse(data.enrolledCourses.reverse())
    }else{
        toast.error(data.message)
    }
        
    } catch (error) {
        toast.error(error.message)
    }


}




useEffect(()=>{
   fetchAllCourse();
},[])


useEffect(()=>{
    if(user){
  fetchUserData()
  fetchUserEnrolledCourse()
    }
},[user])


    const value={
        currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,enrolledCourses,fetchUserEnrolledCourse,backendUrl,userData,setUserData,getToken,fetchAllCourse
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};
