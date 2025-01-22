import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ id: null, role: null });

    const login = (id, role) => {
        localStorage.setItem('id', id);
        localStorage.setItem('role', role);
        setAuth({ id, role });
    };

    const logout = async (isManual = true) => {
        try {
            if (isManual) {
                await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            }
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            setAuth({ id: null, role: null });
            window.location.href = '/login';
        } catch (err) {
            console.error('Error during logout:', err);
        }
    };

    useEffect(() => {
        const storedId = localStorage.getItem('id');
        const storedRole = localStorage.getItem('role');
        if(storedId && storedRole){
            setAuth({ id: storedId, role: storedRole });
        }
    }, [])

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
