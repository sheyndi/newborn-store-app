import { use, useState } from "react";
import { useEffect } from "react";
import { getAllProductsApi, pagesProductsApi } from "../api/productService";
import { useRef } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useApiRequestState } from "../hooks/dataFetchReducer";
import Product from "../components/productInList";
import UpdateProduct from "../components/updateProduct";
import MiniCart from "../components/MiniCart";
import Pagination from '@mui/material/Pagination';
import imgLoading from "../assets/imgLoading.png";
import '../../public/css/allProduct.scss';
import ErrorMessage from "../components/ErrorMessage";

const AllProducts = () => {
    const { requestStatus, responseData: productsArr, executeRequest, updateData } = useApiRequestState();
    const [numPages, setNumPages] = useState(0);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isShowCart, setIsShowCart] = useState(false);
    const { category, currentPage: currentPageParam } = useParams();
    const currentPage = Number(currentPageParam) || 1;
    const cartTimeoutRef = useRef(null);
    const navigate = useNavigate();
    const limit = 12;

    useEffect(() => {
        const controller = new AbortController();
        executeRequest(() => getAllProductsApi(limit, currentPage, category, { signal: controller.signal }));
        return () => controller.abort();
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

    function updateProductInList(updatedProduct) {
        updateData(
            productsArr.map(product => product._id === updatedProduct._id ? updatedProduct : product)
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
            
            {requestStatus === 'error_system' && (
                <ErrorMessage
                    title="שגיאת מערכת"
                    message="אירעה שגיאה בעת טעינת המוצרים. נסו לרענן את הדף."
                />
            )}


            {(numPages > 1 && productsArr?.length > 0) &&
                <Pagination
                    count={numPages} shape="rounded" page={currentPage}
                    onChange={(event, value) => navigate(`/collection/${category}/${value}`)}
                />
            }

            {isShowCart && <MiniCart handleIsShowCart={handleIsShowCart}></MiniCart>}
            {productToEdit &&
                <UpdateProduct
                    product={productToEdit} changePruductEdit={handleProductEdit} updateProductInList={updateProductInList}
                />
            }
        </div>
    );
}

export default AllProducts;