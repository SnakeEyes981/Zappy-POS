import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import NoPage from '../pages/nopage';
import Kitchendisplay from '../pages/kitchendisplay';
import ControlPanel from '../pages/controlpanel';

export default function app() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/control-panel" element={<ControlPanel />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/kitchen" element={<Kitchendisplay />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
};
