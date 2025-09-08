import { useForm, Controller } from "react-hook-form";
import { addUserApi, loginApi } from "../api/userService";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import { useState } from "react";
import { useApiRequestState } from "../hooks/dataFetchReducer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userValidationRules } from "../validations/userValidation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import FilledInput from "@mui/material/FilledInput";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import '../../public/css/authForm.scss';

const AuthForm = () => {
    const { requestStatus, requestError, executeRequest } = useApiRequestState();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { userName: "", email: "", password: "", phone: "" }
    });

    const disp = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isSignUp = location.pathname === "/signup";

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((show) => !show);

    function save(data) {
        const apiCall = isSignUp ? addUserApi : loginApi;

        executeRequest(() => apiCall(data), (res) => {
            disp(userIn(res));
            alert("שלום ל: " + res.userName);
            navigate(-1);
        });
    }

    return (
        <div className="auth-container">
            <form noValidate onSubmit={handleSubmit(save)}>

                {/* אימייל */}
                <Controller
                    name="email"
                    control={control}
                    rules={userValidationRules.email}
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.email}>
                            <InputLabel htmlFor="filled-email">אימייל</InputLabel>
                            <FilledInput {...field} id="filled-email" type="email" />
                            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                {/* שם משתמש - רק בהרשמה */}
                {isSignUp && (
                    <Controller
                        name="userName"
                        control={control}
                        rules={userValidationRules.userName}
                        render={({ field }) => (
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.userName}>
                                <InputLabel htmlFor="filled-userName">שם משתמש</InputLabel>
                                <FilledInput {...field} id="filled-userName" />
                                {errors.userName && <FormHelperText>{errors.userName.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                )}

                {/* סיסמה */}
                <Controller
                    name="password"
                    control={control}
                    rules={userValidationRules.password}
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.password}>
                            <InputLabel htmlFor="filled-password">סיסמה</InputLabel>
                            <FilledInput
                                {...field}
                                id="filled-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                        </FormControl>
                    )}
                />
                {!isSignUp && <a className='forgot-password-link' href="/forgot-password" >שכחתי סיסמה</a>}

                {/* טלפון - רק בהרשמה */}
                {isSignUp && (
                    <Controller
                        name="phone"
                        control={control}
                        rules={userValidationRules.phone}
                        render={({ field }) => (
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.phone}>
                                <InputLabel htmlFor="filled-phone">טלפון</InputLabel>
                                <FilledInput {...field} id="filled-phone" type="tel" />
                                {errors.phone && <FormHelperText>{errors.phone.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                )}

                {/* שגיאה מהשרת */}
                {requestStatus === 'error_user' && <p className="error">{requestError}</p>}

                {/* כפתור */}
                <Button
                    disabled={requestStatus === 'loading'}
                    type="submit"
                    variant="outlined"
                    sx={{ m: 1, width: '25ch' }}
                    size="large"
                >
                    {requestStatus === 'loading'
                        ? <CircularProgress size={35} />
                        : isSignUp ? "הרשמה" : "התחברות"}
                </Button>

                {/* לינק מתחלף */}
                {isSignUp ? (
                    <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                        כבר יש לך חשבון?{" "}
                        <Link to="/login" style={{ textDecoration: 'underline', color: '#1976d2' }}>
                            התחבר
                        </Link>
                    </p>
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                        אין לך חשבון?{" "}
                        <Link to="/signup" style={{ textDecoration: 'underline', color: '#1976d2' }}>
                            הרשם
                        </Link>
                    </p>
                )}
            </form>
        </div>
    );
};

export default AuthForm;
