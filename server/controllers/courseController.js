import Course from "../models/Courses.js"
import Purchase from "../models/Purchase.js"
import User from "../models/User.js"
//get all courses for students
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({isPublished:true}).select(['-courseContent','-enrolledStudents'])
            .populate({path:'educator'})
            

        res.json({ success: true, courses })
    } catch (error) {
        console.error('Error in getAllCourses:', error)
        res.json({ success: false, message: error.message })
    }
}

//get course by id
 export const getCourseId=async(req,res)=>{
    try{
        const {id}=req.params
        const courseData = await Course.findById(id).populate('educator','name')
        //remove lec url if ispreivew is false
        courseData.courseContent.forEach(chapter=>{
            chapter.chapterContent.forEach(lecture=>{
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl=""
                }
            })
        })
        res.json({success:true,courseData})

    }catch(error){
        res.json({success:false,message:error.message})
    }
 }

 