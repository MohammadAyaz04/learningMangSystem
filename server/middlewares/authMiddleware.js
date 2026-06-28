import { clerkClient } from '@clerk/express'

export const protecteducator = async (req, res, next) => {
    try {
        const userId = req.auth().userId
        console.log('protecteducator userId:', userId)

        const response = await clerkClient.users.getUser(userId)
        console.log('publicMetadata:', response.publicMetadata)

        if (response.publicMetadata.role !== 'educator') {
            return res.json({ success: false, message: 'Unauthorized Access' })
        }
        next()
    } catch (error) {
        console.log('protecteducator error:', error.message)
        return res.json({ success: false, message: error.message })
    }
} 