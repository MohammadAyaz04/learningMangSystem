import { createContext, useContext, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();
export const AppContextProvider = (props) => {

const currency=import.meta.env.VITE_CURRENCY;
const navigate=useNavigate()


const[allCourses,setAllCourses]=useState([]);
const[isEducator,setIsEducator]=useState(true)
const [enrolledCourses,setEnrolledCourse]=useState([])

//fetch all courses
const fetchAllCourse=async()=>{
   setAllCourses(dummyCourses);
 
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
    return (totalRating/course.courseRatings.length).toFixed(2);
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
setEnrolledCourse(dummyCourses)

}




useEffect(()=>{
   fetchAllCourse();
},[])

useEffect(()=>{
  fetchUserEnrolledCourse()
},[])
    const value={
        currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,enrolledCourses,fetchUserEnrolledCourse
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};
