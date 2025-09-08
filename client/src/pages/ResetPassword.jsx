import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { resetPasswordApi } from '../api/userService';
import { useApiRequestState } from '../hooks/dataFetchReducer';
import { userValidationRules } from "../validations/userValidation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import FilledInput from '@mui/material/FilledInput';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import '../../public/css/resetPassword.scss';

function ResetPassword() {
  const { executeRequest, requestError, setError, requestStatus, setStatus } = useApiRequestState();
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { password: '', confirmPassword: '' },
    mode: "onBlur"
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }
    executeRequest(() => resetPasswordApi(token, data.password));
  };

  if (requestStatus === 'success') {
    return (
      <div className="auth-container">
        <div className="success-message">
          <CheckCircleIcon sx={{ fontSize: 60, color: '#4caf50', marginBottom: 2 }} />
          <h2>הסיסמה שונתה בהצלחה!</h2>
          <p>כעת תוכל להתחבר עם הסיסמה החדשה שלך.</p>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{ marginTop: 2, width: '25ch' }}
          >
            התחבר עכשיו
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>איפוס סיסמה</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
          נא להזין את הסיסמה החדשה שלך.
        </p>

        <Controller
          name="password"
          control={control}
          rules={userValidationRules.password}
          render={({ field }) => (
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.password}>
              <InputLabel htmlFor="filled-password">סיסמה חדשה</InputLabel>
              <FilledInput
                {...field}
                id="filled-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
            </FormControl>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "נא לאמת את הסיסמה",
            minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" }
          }}
          render={({ field }) => (
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.confirmPassword}>
              <InputLabel htmlFor="filled-confirm-password">אימות סיסמה</InputLabel>
              <FilledInput
                {...field}
                id="filled-confirm-password"
                type={showPassword ? 'text' : 'password'}
              />
              {errors.confirmPassword && <FormHelperText>{errors.confirmPassword.message}</FormHelperText>}
            </FormControl>
          )}
        />

        {(requestStatus === 'error_system' || requestStatus === 'error_user') && (
          <div className="error-message">
            <ErrorIcon sx={{ fontSize: 20, marginRight: 1 }} />
            {requestStatus === 'error_system' ? 'הקישור לא תקף או שהתרחשה שגיאה' : requestError}
          </div>
        )}

        <Button
          disabled={requestStatus === 'loading'}
          type="submit"
          variant="outlined"
          sx={{ m: 1, width: '25ch' }}
          size="large"
        >
          {requestStatus === 'loading' ? <CircularProgress size={35} /> : "אפס סיסמה"}
        </Button>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p>
            <Link to="/login" style={{ textDecoration: 'underline', color: '#1976d2' }}>חזרה להתחברות</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
