import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Box, IconButton, Tooltip, Badge } from '@mui/material';
import { ShoppingCart, Edit, Delete, Inventory, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteProductApi } from "../api/productService";
import { addProduct } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import '../../public/css/productInList.scss';

const Product = ({ product, updateProduct, removeProductFromList, showCart }) => {
    const disp = useDispatch();
    const user = useSelector(state => state.user.currentUser);

    function handleDelete() {
        let del = window.confirm("אתה בטוח שאתה רוצה למחוק?");
        if (del) {
            deleteProductApi(product._id, user.token)
                .then(res => {
                    console.log(res.data);
                    removeProductFromList(product);
                    alert("נמחק בהצלחה מרובה");
                })
                .catch(err => {
                    console.log(err);
                    alert("שגיאה במחיקת המוצר")
                })
        }
    }

    const handleAddToCart = () => {  
        disp(addProduct(product));
        showCart();
    };

    const isOutOfStock = product.quantity_in_stock === 0;

    const [hovered, setHovered] = useState(false);

    return (
        <Card className="product-card" elevation={2}>
            <Box className="product-image-container">
                <CardMedia
                    component="img"
                    image={product.image_url}
                    alt={product.name}
                    className="product-image"
                />

                <CardActions className="product-actions" >
                    {!isOutOfStock &&
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddToCart}
                            className="add-to-cart-btn"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            {hovered ? "כן זה בשבילי!" : <ShoppingCart />}
                        </Button>}
                </CardActions>

                <Tooltip title="צפיה מהירה" arrow>
                <Link to={`details/${product._id}`} className="magnifier-link" aria-label="הצג פרטי מוצר">
                    <Search fontSize="medium" />
                </Link>
                </Tooltip>

                {/* Stock Status Badges */}
                <Box className="stock-badges">
                    {isOutOfStock && (
                        <Chip
                            label="אזל מהמלאי"
                            color="error"
                            size="small"
                            className="stock-chip out-of-stock"
                        />
                    )}
                </Box>

                {/* Admin Actions Overlay */}
                {user?.role === 'admin' && (
                    <Box className="admin-actions">
                        <Tooltip title="עריכת מוצר" arrow>
                            <IconButton
                                size="small"
                                className="admin-btn edit-btn"
                                onClick={() => updateProduct(product)}
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="מחיקת מוצר" arrow>
                            <IconButton
                                size="small"
                                className="admin-btn delete-btn"
                                onClick={handleDelete}
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </Box>

            <CardContent className="product-content">
                <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    className="product-title"
                >
                    {product.name}
                </Typography>

                <Box className="price-container">
                    <Typography
                        variant="h5"
                        color="primary"
                        className="product-price"
                    >
                        ₪{product.price.toLocaleString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Product;