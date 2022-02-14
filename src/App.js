import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import Home from './pages/home/Home';
import Receipts from './pages/reports/Reports';
import Login from './pages/login/Login';
import SignUp from './pages/sign-up/SignUp';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/reports' element={<Receipts />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
