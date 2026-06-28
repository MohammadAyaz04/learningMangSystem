import User from "../models/User.js"
import Course from "../models/Courses.js"
import Stripe from "stripe"
import Purchase from "../models/Purchase.js"

export const getUserData=async (req,res)=>{
    try {
        const userId=req.auth().userId
        const user=await User.findById(userId)

        if(!user){
            return res.json({success:false,message:'User not found'})
        }
        res.json({success:true,user})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

//user enrolled courses with lec link
export const userEnrolledCourses=async (req,res)=>{
try{
    const userId=req.auth().userId
    const userData=await User.findById(userId).populate('enrolledCourses')
    if(!userData){
        return res.json({success:false,message:'User not found'})
    }
    res.json({success:true,enrolledCourses:userData.enrolledCourses})
}
catch(error){
    res.json({success:false,message:error.message})
}
}

//purchase course
export const purchaseCourse=async(req,res)=>{
    try{
        const {courseId}=req.body
        const {origin}=req.headers
        const userId=req.auth().userId
        const userData=await User.findById(userId)
        if(!userData){
            return res.json({success:false,message:'User not found'})
        }
        const courseData=await Course.findById(courseId)
        if(!courseData){
            return res.json({success:false,message:'Course not found'})
        }
        
        const purchaseData={
            courseId:courseData._id,
            userId,
            amount:(courseData.coursePrice-courseData.discount * courseData.coursePrice/100).toFixed(2),
        }
        const newPurchase=await Purchase.create(purchaseData)
        //stripegateway

        const stripeInstance=new Stripe(process.env.STRIPE_SECRET_KEY)
        const currency=process.env.CURRENCY.toLowerCase()
         //creating line items to for Stripe
          const lineItems = [{
                quantity: 1,
                price_data: {
                    currency: currency,
                    product_data: {
                        name: courseData.courseTitle,
                    },
                    unit_amount: Math.round(newPurchase.amount * 100),  // cents
                },
            }]
          const session= await stripeInstance.checkout.sessions.create({
            line_items:lineItems,
            mode:'payment',
            success_url:`${origin}/loading/my-enrollments`,
            cancel_url:`${origin}/`,
            metadata:{
                userId:userId.toString(),
                courseId:courseId.toString(),
                purchaseId:newPurchase._id.toString()
            }
          })
          res.json({success:true,session_url:session.url})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
} 