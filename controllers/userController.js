import { sendResetPasswordEmail } from "../Utils/mailService.js";
import { generateToken } from "../Utils/generateToken.js";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

//קבלת כל המשתמשים
export const getAllUsers = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let data = await Users.find().skip((page - 1) * limit).limit(limit).select('-password');
    try {
        if (!data)
            return res.status(404).json({ title: "cannot get all", message: "there are no users" });
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cannot get all", message: err.message });
    }
}

//id קבלת משתמש לפי 
export const getUserByID = async (req, res) => {
    let { id } = req.params;
    let data = await Users.findById(id).select('-password');
    try {
        if (!data)
            return res.status(404).json({ title: "cannot get byId", message: "id is not exists" });
        //המאפיין סיסמה לא ניתן לקבלה
        delete data.password;
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "cannot get by id", message: err.message });
    }
}

//הוספת משתמש
export const addUserSignUp = async (req, res) => {
    let body = req.body;
    //required האם נשלחו כל המאפיינים שהם 
    if (!body.userName || !body.password || !body.email)
        return res.status(400).json({ title: "missing parameters", message: "not all necessary parameters were sent" })
    //בדיקה אם המייל תקין
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (body.email && !emailRegex.test(body.email))
        return res.status(404).json({ title: "Email not strong", message: "Email not good" });
    //בדיקה אם הסיסמה תקינה
    const pasRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;;
    if (body.password && !pasRegex.test(body.password))
        return res.status(404).json({ title: "Password not strong", message: "Password should consist of upper and lower case symbols and at least 8 characters" });
    try {
        //בדיקה אם המשתמש קיים 
        let is_user = await Users.findOne({ email: body.email })
        if (is_user)
            return res.status(400).json({ title: "cannot add user", message: "email is exist" })
        body.password = await bcrypt.hash(body.password, 10);
        //הוספת המשתמש החדש
        let newUser = new Users(req.body);
        let data = await newUser.save();
        data = data.toObject();
        data.password = undefined;
        data.token = generateToken(data);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "error in add new user", message: err.message });
    }
}

//עדכון פרטי משתמש
export const updateUser = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    //לא ניתן לעדכן סיסמה
    if (body.password)
        body.password = undefined;
    //אם נשלח מייל בדיקה אם הוא תקין
    const emailRegex = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";
    if (body.email && !emailRegex.test(body.email))
        return res.status(404).json({ title: "Email not strong", message: "Email not good" });
    let data = await Users.findByIdAndUpdate(id, body, { new: true });
    try {
        if (!data)
            return res.status(404).json({ title: "error cannot get byId to update", message: "id not defind" });
        data.password = undefined;
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "error in update", message: err.message });
    }
}

//עדכון סיסמה
export const updatePassword = async (req, res) => {
    let { userId } = req.user;
    let body = req.body;
    //אם לא התקבל סיסמה
    if (!body.password)
        return res.status(404).json({ title: "missing password", message: "not send password" });
    //אם הסיסמה חזקה
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;;
    if (body.password && !passwordRegex.test(body.password))
        return res.status(404).json({ title: "Password not strong", message: "Password should consist of upper and lower case symbols and at least 8 characters" });
    try {
        body.password = await bcrypt.hash(body.password, 10);
        let data = await Users.findByIdAndUpdate(userId, body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot get byId to update", message: "id not defind" });
        data.password = undefined;
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "error in update password", message: err.message });
    }
}

//קבלת משתמש לפי שם משתמש וסיסמה
export const getUserByLogin = async (req, res) => {
    const { email, password } = req.body;
    //אם לא התקבל סיסמא או מייל
    if (!email || !password)
        return res.status(400).json({ title: "error in get by login", message: "missing details" });
    try {
        let data = await Users.findOne({ email: email }).lean();
        if (!data)
            return res.status(400).json({ title: "cannot get by login", message: "no user with such details" });
        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch)
            return res.status(400).json({ title: "cannot get by login", message: "password not good" });
        data.password = undefined;
        data.token = generateToken(data);
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "error in get by login", message: err.message });
    }
}

//קבלת כמות העמודים
export async function getTotalUserPages(req, res) {
    let limit = req.query.limit || 20;
    try {
        let data = await Users.countDocuments();
        res.json({
            totalCount: data,
            totalPages: Math.ceil(data / limit),
            limit: limit
        }
        );
    }
    catch (err) {
        res.status(400).json({ title: "שגיאה בהבאת כמות העמודים", message: err.message });
    }
}

export const sendResetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ title: "Missing email", message: "Email is required" });
    }
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ title: "User not found", message: "No user found with this email" });
        }
        const token = generateToken(user);
        const resetLink = `http://localhost:5173/reset_password/${token}`;
        await sendResetPasswordEmail(email, resetLink);
        res.json({ message: "Reset password email sent successfully" });
    } catch (error) {
        res.status(500).json({ title: "Error sending email", message: error.message });
    }
}
