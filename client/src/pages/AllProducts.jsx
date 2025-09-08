import { useState } from "react";
import { useEffect } from "react";
import { getAllProductsApi, pagesProductsApi } from "../api/productService";
import { useRef } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useApiRequestState } from "../hooks/dataFetchReducer";
import Product from "../components/productInList";
import UpdateProduct from "../components/updateProduct";
import MiniCart from "../components/MiniCart";
import Pagination from '@mui/material/Pagination';
import imgLoading from "../assets/imgLoading.png";
import '../../public/css/allProduct.scss';

const AllProducts = () => {
    const { requestStatus, responseData: productsArr, executeRequest, updateData } = useApiRequestState();
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isShowCart, setIsShowCart] = useState(false);
    const { category } = useParams();
    const cartTimeoutRef = useRef(null);
    const limit = 12;

    useEffect(() => {
        setCurrentPage(1);
    }, [category]);

    useEffect(() => {
        executeRequest(() =>
            getAllProductsApi(limit, currentPage, category)
        );
    }, [currentPage, category]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const res = await pagesProductsApi(limit, category);
                setNumPages(res.data.totalPages);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPages();
    }, [category]);

    const showCart = () => {
        if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);
        setIsShowCart(true);
        cartTimeoutRef.current = setTimeout(() => setIsShowCart(false), 8000);
    };

    function handleProductEdit(p) {
        setProductToEdit(p);
    }

    function handleIsShowCart() {
        setIsShowCart(false);
    }

    function removeProductFromList(p) {
        updateData(
            productsArr.filter(product => product.id !== p.id)
        )
    }

    return (
        <div className="allProduct">
            <Outlet />
            <ul className="productsContainer">
                {productsArr?.map(product =>
                    <li key={product._id}>
                        <Product
                            product={product} updateProduct={handleProductEdit}
                            showCart={showCart} removeProductFromList={removeProductFromList}
                        />
                    </li>)}
            </ul>

            {requestStatus == 'loading' &&
                    <img className="loading" src={imgLoading} alt="Loading..." width="100px" />
                }
                {productsArr?.length === 0 && requestStatus === 'success' &&
                    <p className="products-empty">אין מוצרים בקטגוריה זו</p>
                }
                {requestStatus === 'error_system' &&
                    <p className="products-error">אירעה שגיאה בעת טעינת המוצרים. נסו לרענן את הדף.</p>
                }

            {(numPages > 1 && productsArr?.length > 0) &&
                <Pagination
                    count={numPages} shape="rounded" page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                />
            }

            {isShowCart && <MiniCart handleIsShowCart={handleIsShowCart}></MiniCart>}
            {productToEdit &&
                <UpdateProduct
                    product={productToEdit} changePruductEdit={handleProductEdit} setProductsArr={updateData}
                />
            }
        </div>
    );
}

export default AllProducts;