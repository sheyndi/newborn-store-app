import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children, role }) {
    let user = useSelector(state => state.user.currentUser);
    if (!user || user.role !== role && user.role !== 'admin') {
        return <Navigate to={user ? "/" : "/login"} replace />
    }
    return children;
}

export default ProtectedRoutes
