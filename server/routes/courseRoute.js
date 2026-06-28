import express from 'express'
import {getAllCourses,getCourseId} from '../controllers/courseController.js'


const courseRouter=express.Router()

//get all courses for students
courseRouter.get('/all',getAllCourses)
//get course by id
courseRouter.get('/:id',getCourseId)


export default courseRouter  