import connectToDB from "./config/DB.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import orderRouter from "./routes/orderRoute.js"
import cors from "cors";
import dotenv from "dotenv";
import express from "express"

const allowedOrigins = [
  "https://new-born-byta.netlify.app",
  "http://localhost:5173"
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

dotenv.config();

const app = express();

connectToDB();

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/images", express.static("public/products"));
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

let port = process.env.PORT || 3001;

app.listen(port, () => {

    console.log("app is listening on port " + port)
})
