import {Router} from "express"
import { getAllOrders, getOrderById ,getAllOrdersInDate, getOrdersFromUserById ,deleteOrder,addOrder,updateOrder, UpdateOrderIsSending, getTotalOrderPages} from "../controllers/orderController.js"
import { checkUser, checkManeger } from "../middleware/check.js";

const orderRoute = Router();

orderRoute.get("", checkManeger, getAllOrders);

orderRoute.get("/numPages", checkManeger, getTotalOrderPages)

orderRoute.get("/target_date/:date", checkManeger, getAllOrdersInDate);

orderRoute.get("/get_from_user/:id",checkUser, getOrdersFromUserById);

orderRoute.get("/:id",checkUser, getOrderById);

orderRoute.delete("/:id",checkUser, deleteOrder);

orderRoute.post("",checkUser,addOrder);

orderRoute.put("/update_sending/:id", checkManeger, UpdateOrderIsSending);

orderRoute.put("/:id",checkUser, updateOrder);


export default orderRoute;
