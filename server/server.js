import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import {clerkMiddleware} from '@clerk/express'


//npm run server inside server file

 //initialize express
const app = express();

//Middlewares
app.use(cors());
app.use(clerkMiddleware())

//connect to database
connectDB();


//Routes
app.get("/", (req, res) => {
    res.send("Learning Management System API is running");
});
app.post('/clerk',express.json(),clerkWebhooks)
app.use('/api/educator',express.json(),educatorRouter)

//Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app; 