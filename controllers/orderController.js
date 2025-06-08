import ORDERS from "../models/orderModel.js";
import USERS from "../models/userModel.js";
import GIFTS from "../models/giftModel.js";
import orderModel from "../models/orderModel.js";

//קבלת כל ההזמנות
export const getAllOrders = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;

    try {
        let data = await ORDERS.find().skip((page - 1) * limit).limit(limit).lean();
        if (!data)
            return res.status(404).json({ title: "cannot get all", message: "There are no products yet" })
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

//id קבלת הזמנה לפי 
export const getOrderById = async (req, res) => {
    let { id } = req.params;

    try {
        let data = await ORDERS.findById(id);
        if (!data)
            return res.status(404).json({ title: "cannot get by id", message: "id is not exist" })
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get by id", message: err.message })
    }
}

//id מחיקת הזמנה לפי 
export const deleteOrder = async (req, res) => {
    let { id } = req.params;

    try {
        //שליפת ההזמנה לצורך בדיקות תקינות
        let order = await ORDERS.findById(id)
        //בדיקה האם ההזמנה קיימת
        if (!order)
            return res.status(400).json({ title: "not found this order", message: "id is not exist in GIFTS" })
        //האם ההזמנה כבר יצאה לדרך
        if (order.is_sending == true)
            return res.status(400).json({ title: "cannot delete order", message: "The order has already started" })
        //האם עברו יותר מ 5 ימי עסקים מיום ההזמנה
        if ((new Date() - order.date_order) / (1000 * 60 * 60 * 24) > 5)
            return res.status(400).json({ title: "cannot delete order", message: "5 business days have already passed" })

        let data = await ORDERS.findByIdAndDelete(id);
        if (!data)
            return res.status(400).json({ title: "cannot delete by id", message: "id is not exist" })
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot delete by id", message: err.message })
    }
}

//הוספת הזמנה
export const addOrder = async (req, res) => {
    let body = req.body;
    //בדיקות תקינות:
    //required האם נשלחו כל המאפיינים שהם 
    if (!body.id_user || !body.products)
        return res.status(400).json({ title: "missing parameters", message: "Not all required parameters were received" })

    try {
        //שליפת המשתמש לצורך בדיקות תקינות
        let user = await USERS.findById(body.id_user)
        //האם המשתמש קיים
        if (!user)
            return res.status(400).json({ title: "cannot add order", message: "id_user is not exist" })
        for(const prod of body.products) {
            //שליפת המוצר לצורך בדיקות תקינות
            let gift = await GIFTS.findById(prod.id_gift_in_GIFTS)
            //האם המוצר קיים
            if (!gift)
                return res.status(400).json({ title: "cannot add order", message: "product is not exist" })
            //האם כמות המלאי מספיקה לכמות המבוקשת בהזמנה
            if (gift.quantity_in_stock - prod.quantity < 0)
                return res.status(400).json({ title: "This product cannot be ordered", message: "The product is out of stock" })
            //מחיקת מאפיין מחיר
            prod.price = gift.price;
        };
         //האם תאריך קבלת ההזמנה קטן מהיום הנוכחי
            if (body.target_date && new Date(body.target_date) < Date.now())
                return res.status(400).json({ title: "Invalid date", message: "The received date has passed" })
            //האם מחיר המשלוח תקין
            if (body.price_sending && body.price_sending < 0)
                return res.status(400).json({ title: "Invalid price", message: "The price must be greater than 0" })
        //הוספת המוצר
        let newOrder = new ORDERS(body)
        let data = await newOrder.save();
        //עדכון מלאי המוצר שהוזמן להיות פחות הכמות שהוזמנה
        let giftUpdate = await GIFTS.findByIdAndUpdate(body.products.id_gift_in_GIFTS, { quantity_in_stock: gift.quantity_in_stock - body.quantity }, { new: true })
        res.json(data);
    }
    catch (err) {
        return res.status(500).json({ title: "cannot add order", message: err.message })
    }
}

//id קבלת כל ההזמנות של משתמש מסוים לפי 
export const getOrdersFromUserById = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let { id } = req.params;
    let data = await ORDERS.find({ id_user: id }).skip((page - 1) * limit).limit(limit);
    try {
        if (!data)
            return res.status(400).json({ title: "cannot get order from this user", message: "this user is not exist in GIFTS" })
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot orders", message: err.message })
    }
}

//עדכון מוצר שיצא לדרך
export const UpdateOrderIsSending = async (req, res) => {
    let { id } = req.params;
    let data = await ORDERS.findByIdAndUpdate(id, { is_sending: true }, { new: true });
    try {
        if (!data)
            return res.status(400).json({ title: "cannot get order from this user", message: "this user is not exist in GIFTS" })
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot orders", message: err.message })
    }
}

//עדכון הזמנה
export const updateOrder = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    //לא ניתן לעדכן פרטים אלו - בדיקה אם הם כן נשלחו
    if (body.id_user || body.products || body.price_sending || body.quantity || body.is_sending || body.date_order)
        return res.status(400).json({ title: "some parameters are wrong", title: "unupdatable fields were received" })

    let data = await ORDERS.findByIdAndUpdate(id, body, { new: true })
    try {
        if (!data)
            return res.status(400).json({ title: "cannot update by id", message: "id is not exist" })
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot update by id", message: err.message })
    }
}

//קבלת כל ההזמנות שאמורות להשלח בתאריך מסוים
export const getAllOrdersInDate = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let { date } = req.params;
    //Date בדיקה האם התאריך שהתקבל בפורמט 
    if (!date instanceof Date)
        return res.status(400).json({ title: "Incorrect date", message: "The date should be in Date format" })
    let data = await ORDERS.find({ target_date: date }).skip((page - 1) * limit).limit(limit);
    try {
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get orders in this date", message: err.message })
    }
}

//קבלת כמות העמודים
export async function getTotalOrderPages(req, res) {
    let limit = req.query.limit || 20;
    try {
        let data = await orderModel.countDocuments();
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


