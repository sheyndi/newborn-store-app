// Cart.jsx
import { useDispatch, useSelector } from "react-redux";
import ProductInCart from "../components/productInCart";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../features/cartSlice";
import "../../public/css/cart.scss";

const Cart = () => {
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    const handleFinishOrder = () => {
        navigate(user ? "/checkout" : "/login", { state: { from: "/checkout" } });
    };

    return (
        <div className="cart">
            <div className="cart-products">
                {cart.arrProducts.length === 0 && <p>העגלה שלך ריקה</p>}
                {cart.arrProducts.map(p => (
                    <ProductInCart product={p} key={p._id} />
                ))}
            </div>

            {cart.arrProducts.length !== 0 && (
                <div className="cart-summary">
                    <h2>סכום סופי: {cart.finalPrice} ש"ח</h2>
                    <h2>כמות מוצרים בעגלה: {cart.quantityProduct}</h2>
                    <button type="button" className="clear-cart" onClick={() => dispatch(resetCart())}>
                        רוקן עגלה
                    </button>
                    <button type="button" className="finish-order" onClick={handleFinishOrder}>
                        סיום הזמנה
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
