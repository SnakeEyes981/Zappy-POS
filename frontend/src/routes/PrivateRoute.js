import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PrivateRoute({ children, allowedRoles }) {
    const { auth } = useAuth();
    const { role } = auth;

    if (role === '') {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/home" />;
    }

    return children;
}

export default PrivateRoute;
