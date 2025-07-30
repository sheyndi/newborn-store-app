import { Router } from "express"
import { addGift, deleteGiftById, getAllGiftOutOfStock, getAllGifts, getGiftById, updateGift, getTotalGiftPages } from "../controllers/giftController.js"
import { checkManeger } from "../middleware/check.js"
import upload from "../middleware/upload.js"

const giftRoute = Router()

giftRoute.get("/numPages/:category?", getTotalGiftPages)

giftRoute.get("/all/:category?", getAllGifts)

giftRoute.get("/get_out_of_stock", checkManeger, getAllGiftOutOfStock)

giftRoute.get("/:id", getGiftById)

giftRoute.delete("/:id", checkManeger, deleteGiftById)

giftRoute.post("", upload.single('image'),checkManeger,  addGift)

giftRoute.put("/:id", upload.single('image'), checkManeger, updateGift)

export default giftRoute;

