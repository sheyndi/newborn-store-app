import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderApi } from '../api/orderService';
import { resetCart } from '../features/cartSlice';
import { useState } from "react";
import { useEffect } from 'react';
import { useApiRequestState } from '../hooks/dataFetchReducer';
import { Button } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import '../../public/css/CheckOut.scss';

const CheckOut = () => {
  const { requestStatus, responseData, requestError, executeRequest } = useApiRequestState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const disp = useDispatch();
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)
  const [indexError, setIndexError] = useState(-1);
  const steps = ['פרטי הזמנה', 'תשלום', 'סיום',];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (errors.address_target) {
      setIndexError(0);
      return;
    }
    if (errors.credit_card_number || errors.credit_card_expiration || errors.credit_card_cvv) {
      setIndexError(1);
      return;
    }
    setIndexError(-1);
  }, [errors.address_target, errors.credit_card_number, errors.credit_card_expiration, errors.credit_card_cvv]);

  function save(data) {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
      return;
    }

    data.id_user = user.currentUser._id;
    data.products = cart.arrProducts.map(p => ({
      name: p.name,
      price: p.price,
      id_product_in_PRODUCTS: p._id,
      quantity: p.quantity
    }));

    executeRequest(() => addOrderApi(data, user.currentUser.token), () => disp(resetCart()));
  }

  if (requestStatus === "success") {
    return (
      <div className="checkout-container">
        <div className="success-message">
          <CheckCircleIcon sx={{ fontSize: 60, color: '#4caf50', marginBottom: 2 }} />
          <h2>!ההזמנה בוצעה בהצלחה</h2>
          <p>תודה שבחרת לקנות אצלנו 🎁</p>
          <p>אישור ההזמנה נשלח לכתובת האימייל שלך</p>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{ marginTop: 2, width: '25ch' }}
          >
            חזרה לחנות
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">

      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel error={indexError === index}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(save)} >

          {/* Stage 0: Order Details*/}
          {currentStep === 0 && <>
            <div id='order-details'>

              <input
                className="checkout-input street-input"
                type="text"
                placeholder="רחוב - נא להכניס את שם הרחוב"
                {...register("address_target.street", {
                  required: { value: true, message: "יש להכניס שם רחוב" }
                })}
              />
              {errors.address_target?.street && <p className="error street-error">{errors.address_target.street.message}</p>}

              <input
                className="checkout-input city-input"
                type="text"
                placeholder="עיר - נא להכניס את שם העיר"
                {...register("address_target.city", {
                  required: { value: true, message: "יש להכניס שם עיר" }
                })}
              />
              {errors.address_target?.city && <p className="error city-error">{errors.address_target.city.message}</p>}

              <input
                className="checkout-input street-number-input"
                type="number"
                placeholder="מספר רחוב - נא להכניס את מספר הרחוב"
                {...register("address_target.street_number", {
                  required: { value: true, message: "יש להכניס מספר רחוב" }
                })}
              />
              {errors.address_target?.street_number && <p className="error street-number-error">{errors.address_target.street_number.message}</p>}

              <input
                className="checkout-input house-number-input"
                type="number"
                placeholder="מספר בית - נא להכניס את מספר הבית"
                {...register("address_target.house_number", {
                  required: { value: true, message: "יש להכניס מספר בית" }
                })}
              />
              {errors.address_target?.house_number && <p className="error house-number-error">{errors.address_target.house_number.message}</p>}

              <textarea
                className="checkout-input notes-input"
                placeholder="הערות להזמנה (לא חובה)"
                {...register("order_notes")}
              />

              <label className="gift-checkbox-label">
                <input
                  className="checkout-input gift-checkbox"
                  type="checkbox"
                  {...register("wrap_as_gift")}
                />
                לארוז כמתנה
              </label>

              <label className="greeting-file-label">
                העלאת דף ברכה (PDF בלבד):
                <input
                  className="checkout-input greeting-file-input"
                  type="file"
                  accept="application/pdf"
                  {...register("greeting_file")}
                />
              </label>

            </div>
          </>}

          {/* Stage 1: Payment Details */}
          {currentStep === 1 && <>
            <div className="payment-details">

              <input
                type="text"
                placeholder="מספר כרטיס אשראי"
                {...register("cardNumber", {
                  required: "חובה להזין מספר כרטיס",
                  minLength: { value: 12, message: "מינימום 12 ספרות" }
                })}
              />
              {errors.cardNumber && <p>{errors.cardNumber.message}</p>}

              <input
                type="text"
                placeholder="MM/YY"
                {...register("expiry", { required: "חובה להזין תוקף" })}
              />
              {errors.expiry && <p>{errors.expiry.message}</p>}

              <input
                type="text"
                placeholder="CVV"
                {...register("cvv", {
                  required: "חובה להזין CVV",
                  minLength: { value: 3, message: "לפחות 3 ספרות" }
                })}
              />
              {errors.cvv && <p>{errors.cvv.message}</p>}

              <input
                type="text"
                placeholder="שם בעל הכרטיס"
                {...register("cardName", { required: "חובה להזין שם" })}
              />
              {errors.cardName && <p>{errors.cardName.message}</p>}

            </div>
          </>}

          {/* Stage 2: Summary */}
          {currentStep === 2 && <>
            <div className="checkout-summary">

              <h3 className="checkout-summary total-price">סכום לתשלום: {cart.finalPrice} ש"ח</h3>
              <h3 className="checkout-summary total-items">מספר פריטים: {cart.quantityProduct}</h3>
              <h3 className="checkout-summary order-number">מספר הזמנה: {Math.floor(Math.random() * 1000000)}</h3>
            </div>

          </>}
          <button className="checkout-input submit-btn" type="submit">
            {requestStatus == "loading" ? <CircularProgress size={35} /> : currentStep === 2 ? "שליחה" : "הבא"}
          </button>

        </form>

      </Box>
    </div>);
}

export default CheckOut;
