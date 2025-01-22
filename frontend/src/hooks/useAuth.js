import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
    const { auth, login, logout } = useContext(AuthContext);

    const isAuthenticated = !!auth.role;

    return {
        isAuthenticated,
        auth,
        login,
        logout,
    };
}
