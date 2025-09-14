import { Alert, AlertTitle } from "@mui/material";
import '../../public/css/errorMessage.scss'

const ErrorMessage = ({ title = "שגיאה", message }) => {
  return (
    <div className="error-message">
      <Alert severity="error" variant="filled">
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export default ErrorMessage;
