import { useForm } from "react-hook-form";
import { addProductApi } from "../api/productService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useApiRequestState } from "../hooks/dataFetchReducer";
import { productValidationRules } from "../validations/productValidation";
import '../../public/css/addProduct.scss';

const AddProduct = () => {
    const { requestStatus, executeRequest } = useApiRequestState();
    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors }, watch } = useForm({ mode: "all" });

    const watchImage = watch("image");

    const save = (data) => {
        if (!user) {
            alert("צריך להתחבר כדי להוסיף מוצר");
            navigate("/login");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("is_add_text", data.is_add_text || false);
        formData.append("category", data.category);
        formData.append("quantity_in_stock", data.quantity_in_stock);
        if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }

        executeRequest(
            () => addProductApi(formData, user.token),
            () => navigate("/collection")
        );
    };

    return (
        <div className="addProduct">
            <form onSubmit={handleSubmit(save)} encType="multipart/form-data">

                <label>שם מוצר</label>
                <input type="text" placeholder="הכנס שם מוצר"
                    {...register("name", productValidationRules.name)}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}

                <label>תיאור</label>
                <input type="text" placeholder="תיאור מוצר"
                    {...register("description", productValidationRules.description)}
                />
                {errors.description && <p className="error">{errors.description.message}</p>}

                <label>מחיר</label>
                <input type="number" min={0.5} step={0.1}
                    {...register("price", productValidationRules.price)}
                />
                {errors.price && <p className="error">{errors.price.message}</p>}

                <label>תמונה</label>
                <input type="file" accept="image/*"
                    {...register("image", productValidationRules.image)}
                />
                {watchImage && watchImage.length > 0 && (
                    <p>קובץ נבחר: {watchImage[0].name}</p>
                )}
                {errors.image && <p className="error">{errors.image.message}</p>}

                <label>
                    <input type="checkbox" {...register("is_add_text")} /> אפשרות להוסיף טקסט
                </label>

                <label>קטגוריה</label>
                <select {...register("category")}>
                    <option value="Gift">מתנות</option>
                    <option value="Baby_strollers">עגלות</option>
                    <option value="Furniture">ריהוט</option>
                    <option value="Clothing_and_textiles">ביגוד וטקסטיל</option>
                    <option value="Toys">צעצועים</option>
                    <option value="Baby_accessories">אקססוריז</option>
                </select>

                <label>כמות במלאי</label>
                <input type="number" min={0}
                    {...register("quantity_in_stock", productValidationRules.quantity_in_stock)}
                />
                {errors.quantity_in_stock && <p className="error">{errors.quantity_in_stock.message}</p>}

                <input type="submit" value={requestStatus === 'loading' ? "שולח..." : "שמור"} disabled={requestStatus === 'loading'} />

            </form>
        </div>
    );
};

export default AddProduct;
