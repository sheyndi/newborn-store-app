import mongoose from "mongoose";

//data base פונקציה בשביל התחברות ל 
export default function connectToDB() {
  mongoose.connect(process.env.MONGO_URI)
    .then(data => console.log("Connected to MongoDB"))
    .catch(err => {
      console.error("Connection error" + err.message);
      process.exit(1);
    })
}






