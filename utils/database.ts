import mongoose from "mongoose"

let isConnected = false;

const URI = process.env.MONGODB_URI
export const connectDB = async () => {

     mongoose.set("strictQuery" , true);
     if(isConnected){
          console.log("mongodb is already connected")
          return;
     }
     try {
          await mongoose.connect(URI , {
               dbName : "task",
               useNewURLParser : true,
               useUnifiedTopology : true,
          })

          isConnected = true;

          console.log("MONGODB is connected")
     } catch (error) {
          console.log(error)
     }
}
