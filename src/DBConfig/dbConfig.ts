import mongoose from "mongoose";

export default function connect(params:type) {
  try {
    mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection
    connection.on('connected', () => {
      console.log('Database connected');
    })

    connection.on('error', () => {
      console.log('Database connection failed');
    })

  } catch (error) {
    console.log('Something went wrong');
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    
  } 
}