import { Schema, model } from "mongoose"

const giftSchema = Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image_url: { type: String },
    is_add_text: { type: Boolean, default: false },
    category: {type:String, enum:['Gift','Baby_strollers', 'Futiure', 'Clothing_and_textiles', 'Toys', 'Baby_accessories']},
    quantity_in_stock: { type: Number, required: true },
    colors: {type: [String]},
    size: {type: [String]}
})

const giftModel = model("gift box", giftSchema);

export default giftModel;