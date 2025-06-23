import { Router } from "express"
import { addGift, deleteGiftById, getAllGiftOutOfStock, getAllGifts, getGiftById, updateGift, getTotalGiftPages } from "../controllers/giftController.js"
import { checkManeger } from "../middleware/check.js"

const giftRoute = Router()

giftRoute.get("/numPages", getTotalGiftPages)

giftRoute.get("/:category", getAllGifts)

giftRoute.get("/get_out_of_stock", checkManeger, getAllGiftOutOfStock)

giftRoute.get("/:id", getGiftById)

giftRoute.delete("/:id", checkManeger, deleteGiftById)

giftRoute.post("", checkManeger, addGift)

giftRoute.put("/:id", checkManeger, updateGift)

export default giftRoute;

