import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Reports from './pages/reports/Reports';
import Login from './pages/login/Login';
import SignUp from './pages/sign-up/SignUp';
import Weather from './pages/weather/Weather';
import ProtectedRoute from './pages/protected-route/ProtectedRoute';
import Header from './components/header/Header';
import './App.css';
import { useLocation } from 'react-router-dom';

import { PATHS } from './helper/Paths';
import { getCurrentUser } from './helper/storage.functions';

function App(): JSX.Element {
  const user = getCurrentUser();
  const { pathname } = useLocation();
  
  return (
    <React.Fragment>
        {user && <Header fromReports={pathname === PATHS.REPORTS}/>}
      <Routes>
        <Route path={PATHS.HOME} element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={Home} />} />
        <Route path={PATHS.REPORTS} element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={Reports} />} />
        <Route path={PATHS.WEATHER} element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={Weather} />} />
        <Route path={PATHS.LOGIN} element={<ProtectedRoute disallowAuthorized={true} redirectTo={PATHS.HOME} component={Login} />} />
        <Route path={PATHS.SIGNUP} element={<ProtectedRoute disallowAuthorized={true} redirectTo={PATHS.HOME} component={SignUp} />}/>
        <Route path={PATHS.WILDCARD} element={<Navigate to={PATHS.HOME} />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
