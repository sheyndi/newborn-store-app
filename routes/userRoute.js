import { Router } from "express"
import { addUserSignUp, getAllUsers, getUserByID, getUserByLogin, updatePassword, updateUser, getTotalUserPages, sendResetPassword } from "../controllers/userController.js"
import { checkUser, checkManeger } from "../middleware/check.js"

const userRoute = Router()

userRoute.get("", checkManeger, getAllUsers)

userRoute.get("/numPages", getTotalUserPages)

userRoute.post("/login", getUserByLogin)

userRoute.get("/:id", getUserByID)

userRoute.post("", addUserSignUp)

userRoute.put("/reset-password/:id", checkUser, updatePassword)

userRoute.put("/:id", checkUser, updateUser)

userRoute.post("/forgot-password", sendResetPassword)


export default userRoute;
