import { useForm, Controller } from 'react-hook-form';
import { forgotPasswordApi } from '../api/userService';
import { Link, useNavigate } from 'react-router-dom';
import { useApiRequestState } from '../hooks/dataFetchReducer';
import { userValidationRules } from "../validations/userValidation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FilledInput from '@mui/material/FilledInput';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../../public/css/forgotPassword.scss';

const ForgotPassword = () => {
    const { requestStatus, responseData, requestError, executeRequest } = useApiRequestState();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: "" },
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        executeRequest(apiFun => forgotPasswordApi(data.email))
    }

    if (requestStatus === 'success') {
        return (
            <div className="auth-container">
                <div className="success-message">
                    <CheckCircleIcon sx={{ fontSize: 60, color: '#4caf50', marginBottom: 2 }} />
                    <h2>האימייל נשלח בהצלחה!</h2>
                    <p>בדוק את תיבת הדואר שלך ולחץ על הקישור לאיפוס הסיסמה.</p>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/login')}
                        sx={{ marginTop: 2, width: '25ch' }}
                    >
                        חזרה להתחברות
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>שחזור סיסמה</h2>
                <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                    נא להזין את כתובת האימייל שלך. נשלח לך קישור לאיפוס הסיסמה.
                </p>

                <Controller
                    name="email"
                    control={control}
                    rules={userValidationRules.email}
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.email}>
                            <InputLabel htmlFor="filled-email">אימייל</InputLabel>
                            <FilledInput
                                {...field}
                                id="filled-email"
                                type="email"
                            />
                            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                {requestStatus === 'error_system' && <p className="error">{serverError}</p>}

                <Button
                    disabled={requestStatus === 'loading'}
                    type="submit"
                    variant="outlined"
                    sx={{ m: 1, width: '25ch' }}
                    size="large"
                >
                    {requestStatus === 'loading' ? <CircularProgress size={35} /> : "שלח קישור לאיפוס סיסמה"}
                </Button>

                <p className="login-link">
                    <Link to="/login" >חזרה להתחברות</Link>
                </p>
            </form>
        </div>
    )
}

export default ForgotPassword