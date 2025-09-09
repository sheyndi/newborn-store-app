import { Router } from "express"
import { addProduct, deleteProductById, getAllProductOutOfStock, getAllProducts, getProductById, updateProduct, getTotalProductPages } from "../controllers/productController.js"
import { checkManeger } from "../middleware/check.js"
import upload from "../middleware/upload.js"

const ProductRoute = Router()

ProductRoute.get("/numPages/:category", getTotalProductPages)

ProductRoute.get("/all/:category", getAllProducts)

ProductRoute.get("/get_out_of_stock", checkManeger, getAllProductOutOfStock)

ProductRoute.get("/:id", getProductById)

ProductRoute.delete("/:id", checkManeger, deleteProductById)

ProductRoute.post("", upload.single('image'),checkManeger,  addProduct)

ProductRoute.put("/:id", upload.single('image'), checkManeger, updateProduct)

export default ProductRoute;

