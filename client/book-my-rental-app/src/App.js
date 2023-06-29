import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from "./components/Login/LoginForm";
import ForgotPasswordForm from "./components/Login/ForgotPasswordForm";
import OTPVerification from './components/Login/OTPVerification';
import Dashboard from "./components/Dashboard/Dashboard";
import { UserAuthContextProvider } from "./context/UserAuthContext";

const App = () => {
  return(
    <UserAuthContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />}> </Route>
        <Route path="/forgot-password" element={<ForgotPasswordForm />}> </Route>
        <Route path="/otp-verification" element={<OTPVerification />} > </Route>
        <Route path="/dashboard" element={<Dashboard />}> </Route>
      </Routes>
    </Router>
    </UserAuthContextProvider>
  );
}

export default App;
