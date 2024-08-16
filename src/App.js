import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';
import PrivateRoutes from './PrivateRoutes';
import PricingPage from './PricingPage';
import SignUpForm from './SignUpForm';
import ProfilePage from './ProfilePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                    <Route path="/pricingpage" element={<PricingPage />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/profile" element={<ProfilePage/>} />
                    </Route>
            </Routes>
        </Router>
    );
}

export default App;
