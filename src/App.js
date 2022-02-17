import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import Home from './pages/home/Home';
import Reports from './pages/reports/Reports';
import Login from './pages/login/Login';
import SignUp from './pages/sign-up/SignUp';

import { PATHS } from './helper/Paths';

import ProtectedRoute from './pages/protected-route/ProtectedRoute';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={<Home />} />} />
        <Route path='/reports' element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={<Reports />} />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
