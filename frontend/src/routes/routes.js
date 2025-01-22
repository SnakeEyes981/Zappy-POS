import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import NoPage from '../pages/nopage';
import Kitchendisplay from '../pages/kitchendisplay';
import ControlPanel from '../pages/controlpanel';
import AllOrders from '../pages/orders';

export default function App() {

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