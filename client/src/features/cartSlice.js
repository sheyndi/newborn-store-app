import { createSlice } from "@reduxjs/toolkit"

const initCart = {
    arrProducts: JSON.parse(localStorage.getItem('arrProduct')) || [],
    finalPrice: JSON.parse(localStorage.getItem('finalPrice')) || 0,
    quantityProduct: JSON.parse(localStorage.getItem('quantityProduct')) || 0
}

const updateLocalStorage = (state) => {
    localStorage.setItem('arrProduct', JSON.stringify(state.arrProducts));
    localStorage.setItem('finalPrice', JSON.stringify(state.finalPrice));
    localStorage.setItem('quantityProduct', JSON.stringify(state.quantityProduct));
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initCart,
    reducers: {
        addProduct: (state, action) => {
            state.quantityProduct++;
            const p = state.arrProducts.find(p => p._id === action.payload._id);
            if (p) {
                if (p.quantity >= p.quantity_in_stock) {
                    alert("המוצר אזל מהמלאי");
                    return;
                }
                p.quantity++;
            } else {
                state.arrProducts.push({ ...action.payload, quantity: 1 });
                localStorage.setItem('arrProduct', JSON.stringify(state.arrProducts));
            }
            state.finalPrice += action.payload.price;
            updateLocalStorage(state);
        },

        deleteProduct: (state, action) => {
            const index = state.arrProducts.findIndex(p => p._id === action.payload._id);
            if (index !== -1) {
                state.finalPrice -= state.arrProducts[index].price * state.arrProducts[index].quantity;
                state.quantityProduct -= state.arrProducts[index].quantity;
                state.arrProducts.splice(index, 1);
                updateLocalStorage(state);
            }
        },

        decQuantityProduct: (state, action) => {
            const index = state.arrProducts.findIndex(p => p._id === action.payload._id);
            if (index !== -1) {
                state.arrProducts[index].quantity--;
                state.finalPrice -= state.arrProducts[index].price;
                if (state.arrProducts[index].quantity === 0) {
                    state.arrProducts.splice(index, 1);
                }
            }
            if (Math.abs(state.finalPrice) < 0.01) {
                state.finalPrice = 0;
            }
            state.quantityProduct--;
            updateLocalStorage(state);
        },
        resetCart: (state, action) => {
            state.arrProducts = [];
            state.finalPrice = 0;
            state.quantityProduct = 0;
            localStorage.removeItem('arrProduct');
            localStorage.removeItem('finalPrice');
            localStorage.removeItem('quantityProduct');
        }
    }
})
export const { addProduct, deleteProduct, decQuantityProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
