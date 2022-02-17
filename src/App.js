import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Reports from './pages/reports/Reports';
import Login from './pages/login/Login';
import SignUp from './pages/sign-up/SignUp';
import Weather from './pages/weather/Weather';
import ProtectedRoute from './pages/protected-route/ProtectedRoute';
import './App.css';

import { PATHS } from './helper/Paths';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path={PATHS.HOME} element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={Home} />} />
        <Route path={PATHS.REPORTS} element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={Reports} />} />
        <Route path={PATHS.WEATHER} element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={Weather} />} />
        <Route path={PATHS.LOGIN} element={<Login />}/>
        <Route path={PATHS.SIGNUP} element={<SignUp />}/>
        <Route path={PATHS.WILDCARD} element={<Navigate to={PATHS.HOME} />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
