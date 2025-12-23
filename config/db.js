import mongoose from "mongoose"
import dotenv from "./dotenv.js"

const db = async()=>{
    try {
        await mongoose.connect(dotenv.MONGODB_URL)
        console.log(`Database Connected !`);
    } catch (error) {
        console.log(error.message);
    }
}

export default db();