import mongoose from "mongoose"; //connects to DB
import uri from "./mongoURI.js"; //get connection URL from mongo.js

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Could not connect to MongoDB: ", error);
  }
};

export default connectToDatabase;
