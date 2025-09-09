import PRODUCTS from "../models/productModel.js";

//קבלת כל המוצרים
export const getAllProducts = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let { category } = req.params;
    let data = await PRODUCTS.find(category == "כל המוצרים" ? {} : { category: category }).skip((page - 1) * limit).limit(limit);
    try {
        if (!data)
            return res.status(404).json({ title: "cannot get all", message: "not found Products" });
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message });
    }
}

//id קבלת מוצר לפי 
export const getProductById = async (req, res) => {
    let { id } = req.params;
    let data = await PRODUCTS.findById(id);
    try {
        if (!data)
            return res.status(404).json({ title: "cannot get by id", message: "id not found" });
        res.json(data)
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get by id", message: err.message });
    }
}

//id מחיקת מוצר לפי  
export const deleteProductById = async (req, res) => {
    let { id } = req.params;
    let data = await PRODUCTS.findByIdAndDelete(id);
    try {
        if (!data)
            return res.status(404).json({ title: "cannot delete by id", message: "id is not exists" });
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot delete by id", message: err.message });
    }
}
export const addProduct = async (req, res) => {
    let body = req.body;
    //בדיקות תקינות:
    //required האם נשלחו כל המאפיינים שהם 
    if (!body.name || !body.price || !body.quantity_in_stock || !body.category || !req.file)
        return res.status(400).json({ title: "missing parameters", message: "not all necessary parameters were sent" });
    //האם המחיר של המוצר תקין
    if (body.price < 1)
        return res.status(400).json({ title: "price not good", message: "price need be bigger then 0" });
    //האם כמות המלאי תקינה
    if (body.quantity_in_stock < 1)
        return res.status(400).json({ title: "quantity_in_stock not good", message: "quantity_in_stock need be bigger then 0" });
    //הוספת המוצר
    body.image_url = "https://baby-store-node-backend.onrender.com/api/images/" + req.file.filename;
    let newProduct = new PRODUCTS(req.body);
    let data = await newProduct.save();
    try {
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "error in add new Product", message: err.message });
    }
}

//עדכון פרטי מוצר
export const updateProduct = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    if (req.file) {
        body.image_url = "https://baby-store-node-backend.onrender.com/api/images/" + req.file.filename;
    }
    let data = await PRODUCTS.findByIdAndUpdate(id, body, { new: true });
    try {
        if (!data)
            return res.status(404).json({ title: "error cannot get byId to update", message: "id is not exist" });
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "error in update", message: err.message });
    }
}

//קבלת כל המוצרים שאזלו מהמלאי
export const getAllProductOutOfStock = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let data = await PRODUCTS.find({ quantity_in_stock: 0 }).skip((page - 1) * limit).limit(limit);
    try {
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "error in get all Products that out of stock", message: err.message });
    }
}

//קבלת כמות העמודים
export async function getTotalProductPages(req, res) {
    let { category } = req.params;
    let limit = req.query.limit || 20;
    try {
        let data = await PRODUCTS.countDocuments(category == "כל המוצרים" ? {} : { category: category });
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



