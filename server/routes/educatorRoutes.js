import express from 'express'
import { updateRoleToEducator } from '../controllers/educatorController'

const educatorRouter=express.Router()

//add eductor role
educatorRouter.get('/update-role',updateRoleToEducator)

export default educatorRouter