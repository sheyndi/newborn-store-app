import { useForm } from "react-hook-form";
import { updateProductApi } from "../api/productService.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import { productValidationRules } from "../validations/productValidation.js";
import '../../public/css/updateProduct.scss';

const UpdateProduct = ({ product, changePruductEdit , setProductsArr}) => {
    const STATUS = {
        IDLE: "idle",
        LOADING: "loading",
        SUCCESS: "success",
        ERROR: "error",
    };
    const [status, setStatus] = useState(STATUS.IDLE);
    const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues: product });
    let user = useSelector(state => state.user.currentUser);

    function update(data) {
        setStatus(STATUS.LOADING);
        updateProductApi(data, user.token)
            .then(res => {
                setStatus(STATUS.SUCCESS);
                console.log(res.data);
                setProductsArr(prev => {
                    const newArr = [...prev];
                    const index = newArr.findIndex(p => p._id === data._id);
                    newArr[index] = data;
                    return newArr;
                })
                alert("המוצר עודכן בהצלחה");
                changePruductEdit(null);
            })
            .catch(err => {
                setStatus(STATUS.ERROR);
                console.log(err);
                alert(err.data);
            })
    }

    return (<div className="updateProduct">
        <form onSubmit={handleSubmit(update)}>
            <input type="text"  {...register("name", productValidationRules.name)} />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <input type="text"  {...register("description", productValidationRules.description)} />
            {errors.description && <p className="error">{errors.description.message}</p>}

            <input type="number" min={1} step={0.1} {...register("price", productValidationRules.price)} />
            {errors.price && <p className="error">{errors.price.message}</p>}

            <input type="url"  {...register("image_url", productValidationRules.image)} />
            {errors.image_url && <p className="error">{errors.image_url.message}</p>}

            <input type="checkbox"  {...register("is_add_text")} />
            <select  {...register("category")}>
                <option value="מתנות">מתנות</option>
                <option value="עגלות">עגלות</option>
                <option value="רהיטים">ריהוט</option>
                <option value="ביגוד וטקסטיל">ביגוד וטקסטיל</option>
                <option value="צעצועים">צעצועים</option>
                <option value="אקססוריז">אקססוריז</option>
            </select>
            {errors.is_add_text && <p className="error">{errors.is_add_text.message}</p>}

            <input type="number" min={0}  {...register("quantity_in_stock", productValidationRules.quantity_in_stock)} />
            {errors.quantity_in_stock && <p className="error">{errors.quantity_in_stock.message}</p>}

            <input type="submit" value="שמור" />
            <input type="button" value="ביטול" onClick={() => changePruductEdit(null)} />

        </form>
    </div>);
}

export default UpdateProduct;