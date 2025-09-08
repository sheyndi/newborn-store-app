import GIFTS from "../models/giftModel.js";

//קבלת כל המוצרים
export const getAllGifts = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let { category } = req.params;
    let data = await GIFTS.find(category == "כל המוצרים" ? {} : { category: category }).skip((page - 1) * limit).limit(limit);
    try {
        if (!data)
            return res.status(404).json({ title: "cannot get all", message: "not found gifts" });
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message });
    }
}

//id קבלת מוצר לפי 
export const getGiftById = async (req, res) => {
    let { id } = req.params;
    let data = await GIFTS.findById(id);
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
export const deleteGiftById = async (req, res) => {
    let { id } = req.params;
    let data = await GIFTS.findByIdAndDelete(id);
    try {
        if (!data)
            return res.status(404).json({ title: "cannot delete by id", message: "id is not exists" });
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot delete by id", message: err.message });
    }
}
export const addGift = async (req, res) => {
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
    let newGift = new GIFTS(req.body);
    let data = await newGift.save();
    try {
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "error in add new gift", message: err.message });
    }
}

//עדכון פרטי מוצר
export const updateGift = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    if (req.file) {
        body.image_url = "https://baby-store-node-backend.onrender.com/api/images/" + req.file.filename;
    }
    let data = await GIFTS.findByIdAndUpdate(id, body, { new: true });
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
export const getAllGiftOutOfStock = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let data = await GIFTS.find({ quantity_in_stock: 0 }).skip((page - 1) * limit).limit(limit);
    try {
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ title: "error in get all gifts that out of stock", message: err.message });
    }
}

//קבלת כמות העמודים
export async function getTotalGiftPages(req, res) {
    let { category } = req.params;
    let limit = req.query.limit || 20;
    try {
        let data = await GIFTS.countDocuments(category == "כל המוצרים" ? {} : { category: category });
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



