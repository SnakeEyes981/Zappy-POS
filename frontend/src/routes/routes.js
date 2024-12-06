import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import NoPage from '../pages/nopage';

export default function app() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
};
