export const productValidationRules = {
    name: {
        required: { value: true, message: "שם מוצר חובה" },
        minLength: { value: 5, message: "שם חייב להכיל לפחות 5 תווים" }
    },
    description: {
        minLength: { value: 10, message: "תיאור חייב להכיל לפחות 10 תווים" }
    },
    price: {
        required: { value: true, message: "חובה להכניס מחיר" },
        min: { value: 0.5, message: "מחיר חייב להיות מספר חיובי" }
    },
    image: {
        required: { value: true, message: "חייבים להכניס תמונה" }
    },
    quantity_in_stock: {
        required: { value: true, message: "חובה להכניס כמות" },
        min: { value: 0, message: "כמות חייבת להיות מספר חיובי" }
    }
};
