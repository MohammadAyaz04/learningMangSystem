import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import {clerkMiddleware} from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'
import { stripeWebhooks } from './controllers/webhooks.js'


//npm run server inside server file

 //initialize express
const app = express();

//Middlewares
app.use(cors());
app.use(clerkMiddleware())

//connect to database
await connectDB();
await connectCloudinary()


//Routes
app.get("/", (req, res) => {
    res.send("Learning Management System API is running");
});
app.post('/clerk', express.raw({type: 'application/json'}), clerkWebhooks)
app.use('/api/educator',express.json(),educatorRouter)
app.use('/api/courses',express.json(),courseRouter)
app.use('/api/user',express.json(),userRouter)
app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)


//Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app; 

// Your API = routes + middleware + controllers + models, all wired together in your Express app. When someone says "call the API," they mean: hit a route → pass through middleware → run the controller → controller talks to the model/database → response goes back.
// You're not building "an API" as some separate fifth thing — the Express backend you've been building this whole time (Eduno's server) is the API.    