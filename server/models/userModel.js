import { Schema, model } from "mongoose"

const userSchema = Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true, "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" },
    email: { type: String, required: true, unique: true, "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" },
    phone: { type: String, required: true },
    registration_date: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'user'], required: true, default: "user" }
})

const userModel = model("user", userSchema);

export default userModel;
