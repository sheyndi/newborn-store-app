import connectToDB from "./config/DB.js"
import userRouter from "./routes/userRoute.js"
import giftRouter from "./routes/giftRoute.js"
import orderRouter from "./routes/orderRoute.js"
import cors from "cors";
import dotenv from "dotenv";
import express from "express"

dotenv.config();

const app = express();

connectToDB();

app.use(cors());

app.use(express.json());
app.use("/api/images", express.static("public/images"));
app.use("/api/user", userRouter);
app.use("/api/gift", giftRouter);
app.use("/api/order", orderRouter);

let port = process.env.PORT || 3001;

app.listen(port, () => {

    console.log("app is listening on port " + port)
})
