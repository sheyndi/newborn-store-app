import { Route, Routes } from "react-router-dom";
import AllProducts from "../pages/AllProducts";
import AuthForm from "../pages/AuthForm";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";
import AddProduct from "../pages/addProduct";
import ProtectedRoutes from "./ProtectedRoutes";
import ProductDetails from "./ProductDetails";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import HomePage from "../pages/HomePage";

const Router = () => {
    return (
        <Routes>
            <Route path="collection/:category" element={<AllProducts />} >
                <Route path="details/:id" element={<ProductDetails />} />
            </Route>
            <Route path="signup" element={<AuthForm />}></Route>
            <Route path="login" element={<AuthForm />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<ProtectedRoutes role={"user"}><CheckOut /></ProtectedRoutes>}></Route>
            <Route path="/addProduct" element={<ProtectedRoutes role={"admin"}><AddProduct /></ProtectedRoutes>}></Route>
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset_password/:token" element={<ResetPassword />} />
        </Routes>
    );
}

export default Router;