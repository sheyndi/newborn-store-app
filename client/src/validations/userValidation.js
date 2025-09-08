export const userValidationRules = {
  email: {
    required: "נא להזין אימייל",
    pattern: { value: /^\S+@\S+\.\S+$/, message: "כתובת אימייל לא תקינה" }
  },
  userName: {
    required: "נא להזין שם משתמש"
  },
  password: {
    required: "נא להזין סיסמה",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      message: "סיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד"
    }
  },
  phone: {
    required: "נא להזין מספר טלפון",
    pattern: {
      value: /^(\+972|0)([2-9]{1}[0-9]{7}|5[0-9]{8})$/,
      message: "מספר טלפון לא תקין"
    }
  }
};
