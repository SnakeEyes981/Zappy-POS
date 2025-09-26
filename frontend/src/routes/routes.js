import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import NoPage from '../pages/nopage';
import Kitchendisplay from '../pages/kitchendisplay';
import ControlPanel from '../pages/controlpanel';
import AllOrders from '../pages/orders';

export default function App() {

    const [serverStatus, setServerStatus] = useState('loading'); // 'loading', 'online', 'offline'

    const checkServerHealth = async () => {
        try {
            await api.get('https://zappy-api.vercel.app'); // Replace with your API health endpoint
            setServerStatus('online');
        } catch (err) {
            console.error('Server health check failed:', err.message);
            setServerStatus('offline');
        }
    };

    useEffect(() => {
        checkServerHealth();
    }, []);

    if (serverStatus === 'loading') {
        return (
        <div className='relative h-screen w-screen flex flex-col justify-center items-center'>
            <span class="absolute animate-ping inline-flex rounded-full bg-sky-400 opacity-75 w-44 h-44"></span>
            <h5 className='font-bold'>Loading...</h5>
        </div>
        );
    }

    if (serverStatus === 'offline') {
        return (
            <div className='h-screen w-screen flex justify-center items-center flex-col gap-y-4 bg-gradient-to-tl from-teal-400 to-yellow-200'>
                <h1 className='font-bold text-lg text-center sm:text-2xl px-2'>API Server or Internet Connection is Down</h1>
                <p className='text-xs sm:text-sm text-center px-2'>The server is down or the internet connection is unavailable. Please try again later.</p>
                <button className='px-10 py-2 font-semibold bg-stone-950 text-white rounded-md' onClick={checkServerHealth}>Retry</button>
            </div>
        );
    }

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to = '/login'/>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/control-panel" element={<PrivateRoute allowedRoles={['admin']}><ControlPanel /></PrivateRoute>} />
                    <Route path="/home" element={<PrivateRoute allowedRoles={['admin', 'cashier']}><HomePage /></PrivateRoute>} />
                    <Route path="/orders" element={<PrivateRoute allowedRoles={['admin', 'cashier']}><AllOrders /></PrivateRoute>} />
                    <Route path="/kitchen" element={<PrivateRoute allowedRoles={['admin', 'kitchen']}><Kitchendisplay /></PrivateRoute>} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};