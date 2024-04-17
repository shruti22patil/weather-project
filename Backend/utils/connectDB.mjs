import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/';

async function connectToMongoDB() {
  try {
    await mongoose.connect(url,{
        useNewUrlParser : true
    })
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();
export default connectToMongoDB