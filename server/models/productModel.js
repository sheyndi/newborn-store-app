import { Schema, model } from "mongoose"

const productSchema = Schema({
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

const productModel = model("gift box", productSchema);

export default productModel;