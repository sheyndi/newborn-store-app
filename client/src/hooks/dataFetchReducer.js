import { useReducer } from "react";

/**
 * סטטוסים אפשריים לבקשת API/טעינת נתונים
 * @readonly
 * @enum {string}
 */
const STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR_USER: 'error_user',
    ERROR_SYSTEM: 'error_system'
};

/**
 * רידוסר כללי לניהול סטטוס, נתונים ושגיאות של בקשות API
 * @param {object} state - הסטייט הנוכחי
 * @param {object} action - אובייקט פעולה
 * @returns {object} סטייט חדש
 */
export const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case STATUS.LOADING:
            return { ...state, status: STATUS.LOADING, data: null, error: null };
        case STATUS.SUCCESS:
            return { ...state, status: STATUS.SUCCESS, data: action.payload, error: null };
        case STATUS.ERROR_USER:
        case STATUS.ERROR_SYSTEM:
            return { ...state, status: action.type, data: null, error: action.payload };
        case STATUS.IDLE:
            return { ...state, status: STATUS.IDLE, data: null, error: null };
        case 'UPDATE_DATA':
            return { ...state, data: action.payload };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

/**
 * סטייט התחלתי לברירת מחדל של הרידוסר
 * @type {{status: string, data: any, error: any}}
 */
export const initialState = {
    status: STATUS.IDLE,
    data: null,
    error: null,
};

/**
 * hook מותאם לניהול סטטוס, נתונים ושגיאות של בקשות API
 * @returns {{state: object, setLoading: function, setSuccess: function, setError: function, resetState: function, updateData: function}}
 */
export const useDataFetchReducer = () => {
    const [state, dispatch] = useReducer(dataFetchReducer, initialState);

    /**
     * מעבר לסטטוס טעינה
     */
    const setLoading = () => dispatch({ type: STATUS.LOADING });
    /**
     * מעבר לסטטוס הצלחה ושמירת נתונים
     * @param {any} data
     */
    const setSuccess = (data) => dispatch({ type: STATUS.SUCCESS, payload: data });
    /**
     * מעבר לסטטוס שגיאה (יוזר/מערכת)
     * @param {any} error
     */
    const setError = (error, status) => {
        if (status >= 400 && status < 500) {
            dispatch({ type: STATUS.ERROR_USER, payload: error });
        } else {
            dispatch({ type: STATUS.ERROR_SYSTEM, payload: error });
        }
    }
    /**
     * איפוס סטייט לברירת מחדל
     */
    const resetState = () => dispatch({ type: STATUS.IDLE });
    /**
     * עדכון ערך data בלבד
     * @param {any} data
     */
    const updateData = (data) => dispatch({ type: 'UPDATE_DATA', payload: data });

    return { state, setLoading, setSuccess, setError, resetState, updateData };
}

/**
 * hook המנהל בקשת API אסינכרונית עם סטטוס, נתונים ושגיאה, כולל פונקציית הרצה כללית
 * @returns {{requestStatus: string, responseData: any, requestError: any, executeRequest: function, resetState: function, updateData: function}}
 */
export function useApiRequestState() {
    const { state, setLoading, setSuccess, setError, resetState, updateData } = useDataFetchReducer();

    /**
     * מבצע בקשת API אסינכרונית, מעדכן סטטוס, מחזיר נתונים או שגיאה
     * @param {function} apiFun - פונקציה שמחזירה פרומיס של בקשת API
     * @param {function} [onSuccess] - פונקציה שתופעל עם הנתונים במקרה הצלחה
     * @returns {Promise<any>} - הנתונים או השגיאה
     */
    const executeRequest = async (apiFun, onSuccess) => {
        setLoading();
        try {
            const response = await apiFun();
            setSuccess(response.data);
            onSuccess && onSuccess(response.data);
            console.log(response);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || error.message, error.response?.status || 500);
            console.log(error);
            return error
        }
    };

    const { status: requestStatus, data: responseData, error: requestError } = state;
    return { requestStatus, responseData, requestError, executeRequest, resetState, updateData, setError };
}