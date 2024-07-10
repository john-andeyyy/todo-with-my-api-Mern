import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/TodoDashBoard/Header';


import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import TodoDashboard from './components/TodoDashBoard/TodoDashboard';
import Landingpage from './components/Landingpage'
import UserChangepass from './components/Login/UserChangepass';
import ForgotPassword from './components/Login/ForgotPassword';
import Info from './components/Login/Info';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/TodoDashboard" element={<TodoDashboard />} />
        <Route path="/UserChangepass" element={<UserChangepass />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Info" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;
