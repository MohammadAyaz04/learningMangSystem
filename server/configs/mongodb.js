import mongoose from 'mongoose';

//connect to the mongodb datbase
 const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Database connected");
        console.log();
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/lms`)
}

export default connectDB