import { useDispatch } from "react-redux";
import { addProduct, decQuantityProduct, deleteProduct } from "../features/cartSlice";
import "../../public/css/productInCart.scss";

const ProductInCart = ({ product }) => {

    let disp = useDispatch();

    return (
        <div className="product-in-cart-container">
            <img className="product-in-cart-image" src={product.image_url} alt={product.name} />

            <div className="product-in-cart-details">
                <div className="product-in-cart-header">
                    <h3 className="product-in-cart-name">{product.name}</h3>
                    <span className="product-in-cart-price">₪{product.price}</span>
                </div>
                <div className="product-in-cart-actions">
                    <button className="quantity-btn" onClick={() => disp(addProduct(product))}>+</button>
                    <span className="product-in-cart-quantity">{product.quantity}</span>
                    <button className="quantity-btn" onClick={() => disp(decQuantityProduct(product))}>−</button>
                </div>
            </div>

            <button className="delete-btn" onClick={() => disp(deleteProduct(product))}>×</button>
        </div>

    );
}

export default ProductInCart;
