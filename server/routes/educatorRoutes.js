import express from 'express'
import { addCourse, updateRoleToEducator,getEducatorCourses, educatorDashboardData, getEnrolledStudentsData} from '../controllers/educatorController.js'
import { protecteducator } from '../middlewares/authMiddleware.js'
import upload from '../configs/multer.js'
const educatorRouter=express.Router()

//add eductor role
educatorRouter.get('/update-role',updateRoleToEducator)
educatorRouter.post('/add-course', protecteducator, upload.single('image'), addCourse)
educatorRouter.get('/courses', protecteducator, getEducatorCourses)

educatorRouter.get('/dashboard', protecteducator, educatorDashboardData)
educatorRouter.get('/enrolled-students', protecteducator, getEnrolledStudentsData)
export default educatorRouter

  
