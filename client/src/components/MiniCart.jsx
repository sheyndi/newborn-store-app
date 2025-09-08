import { useSelector } from "react-redux";
import ProductInCart from "./productInCart";
import { Link } from "react-router-dom";
import "../../public/css/miniCart.scss";

const MiniCart = ({ handleIsShowCart }) => {
    const cart = useSelector((state) => state.cart);

    return (
        <div className="mini-cart-overlay" onClick={() => handleIsShowCart(false)}>
            <div className="mini-cart-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="mini-cart-header">
                    <h2>עגלת קניות</h2>
                    <button className="close-btn" onClick={() => handleIsShowCart(false)}>
                        ×
                    </button>
                </div>
                <div className="mini-cart-products">
                    {cart.arrProducts.length > 0 ? (
                        cart.arrProducts.map((p) => (
                            <ProductInCart product={p} key={p._id} />
                        ))
                    ) : (
                        <h3 className="mini-cart-empty">העגלה ריקה</h3>
                    )}
                </div>
                <div className="mini-cart-footer">
                    <div className="mini-cart-total">
                        סך הכל: <span>{cart.totalPrice} ₪</span>
                    </div>
                    <div className="mini-cart-btns">
                        <Link to="/cart" className="mini-cart-link">לצפייה בעגלה</Link>
                        <Link to="/checkout" className="mini-cart-link">המשך לתשלום</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniCart;