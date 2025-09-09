import { Schema, model } from "mongoose"
import USERS from "./userModel.js"
import PRODUCTS from "./productModel.js"
//סכמה קטנה של מוצר
const minimalProductschema = Schema({
    name: { type: String, required: true },
    price: Number,
    text: String,
    id_gift_in_Products: { type: Schema.Types.ObjectId, ref: PRODUCTS, required: true },
    formatText: { type: String, enum: ['format1', 'format2', 'format3'] },
    quantity: { type: Number, required: true }
})

const orderSchema = Schema({
    date_order: { type: Date, default: Date.now },
    id_user: { type: Schema.Types.ObjectId, ref: USERS, required: true },
    products: { type: [minimalProductschema], required: true },
    is_sending: { type: Boolean, default: false },
    address_target: { city: { type: String, required: true }, street: { type: String, required: true }, street_number: { type: Number, required: true }, apartment_number: { type: Number } },
    price_sending: { type: Number, default: 0 },
    Greeting: { text: String, background_page: { type: String, enum: [1, 2, 3, 4, 5] } },
})
orderSchema.virtual('final_price').get(function () {
    return this.price_sending + this.products.price;
});
const orderModel = model("order", orderSchema);

export default orderModel;
