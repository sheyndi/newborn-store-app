import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductByIdApi } from '../api/productService';
import { CircularProgress } from '@mui/material';
import { addProduct } from '../features/cartSlice';
import '../../public/css/productDetails.scss';

function ProductDetails() {
    const params = useParams();
    const productId = params.id;
    const navig = useNavigate();
    const user = useSelector(state => state.user.currentUser);
    const [product, setProduct] = useState(null);
    const [numAddToCart, setNumAddToCart] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        getProductByIdApi(productId)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.log(err);
                console.log("תקלה בשליפת המוצר");
            })
    }
        , [productId]);

    return (
        <div className='product-details-overlay'>
            <div className='product-details-modal'>
                <button className='close-btn' onClick={() => navig(-1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                
                {product ? (
                    <div className='product-content'>
                        <div className='image-section'>
                            {product.image_url ? (
                                <div className='image-container'>
                                    <img src={product.image_url} alt={product.name} />
                                    <div className='image-overlay'>
                                        <span className='zoom-hint'>🔍 לחץ להגדלה</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-placeholder">
                                    <div className='placeholder-icon'>📦</div>
                                    <span>אין תמונה זמינה</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="product-info">
                            <div className='header-section'>
                                <h1 className='product-name'>{product.name}</h1>
                                <div className='category-badge'>{product.category}</div>
                            </div>
                            
                            <div className='description-section'>
                                <p className='product-description'>{product.description}</p>
                            </div>
                            
                            <div className='price-section'>
                                <div className='price-container'>
                                    <span className='price-label'>מחיר:</span>
                                    <span className='price-value'>{product.price} ₪</span>
                                </div>
                            </div>
                            
                            <div className='quantity-controls'>
                                <label className='quantity-label'>כמות:</label>
                                <div className='quantity-selector'>
                                    <button 
                                        className='quantity-btn decrease' 
                                        disabled={numAddToCart <= 1}
                                        onClick={() => setNumAddToCart(numAddToCart - 1)}
                                    >
                                        −
                                    </button>
                                    <span className='quantity-display'>{numAddToCart}</span>
                                    <button 
                                        className='quantity-btn increase'
                                        onClick={() => setNumAddToCart(numAddToCart + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            <div className='action-section'>
                                <button 
                                    className='add-to-cart-main-btn'
                                    onClick={() => {
                                        for(let i = 0; i < numAddToCart; i++) {
                                            dispatch(addProduct(product));
                                        }
                                        setNumAddToCart(1);
                                    }}
                                >
                                    <span className='btn-icon'>🛒</span>
                                    הוסף לסל
                                </button>
                            </div>
                            
                            {user?.role === 'admin' && (
                                <div className='admin-info'>
                                    <div className='stock-info'>
                                        <span className='stock-label'>במלאי:</span>
                                        <span className={`stock-value ${product.quantity_in_stock < 10 ? 'low-stock' : ''}`}>
                                            {product.quantity_in_stock} יחידות
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='loading-container'>
                        <CircularProgress sx={{ color: '#ff6b6b', width: '60px !important', height: '60px !important' }} />
                        <p className='loading-text'>טוען פרטי מוצר...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetails
