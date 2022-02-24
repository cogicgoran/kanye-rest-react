import React, { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { setWeatherToday as setReduxWeatherToday, setWeatherForecast as setReduxWeatherForecast } from './store/weather/weather';


function App(): JSX.Element {
  useWeatherStore();
  const user = getCurrentUser();
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      {user && <Header fromReports={pathname === PATHS.REPORTS} />}
      <Routes>
        <Route path={PATHS.HOME} element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={Home} />} />
        <Route path={PATHS.REPORTS} element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={Reports} />} />
        <Route path={PATHS.WEATHER} element={<ProtectedRoute redirectTo={PATHS.SIGNUP} component={Weather} />} />
        <Route path={PATHS.LOGIN} element={<ProtectedRoute disallowAuthorized={true} redirectTo={PATHS.HOME} component={Login} />} />
        <Route path={PATHS.SIGNUP} element={<ProtectedRoute disallowAuthorized={true} redirectTo={PATHS.HOME} component={SignUp} />} />
        <Route path={PATHS.WILDCARD} element={<Navigate to={PATHS.HOME} />} />
      </Routes>
    </React.Fragment>
  );
}

function useWeatherStore() {
  const dispatch = useAppDispatch();
  const weatherToday = useAppSelector((state) => state.weather.value.weatherToday);
  const weatherForecast = useAppSelector((state) => state.weather.value.weatherForecast);

  function onAppInit() {
    try {
      const weatherTodayStringified = localStorage.getItem('weather');
      const weatherForecastStringified = localStorage.getItem('weather-forecast');
      const weatherToday = JSON.parse(weatherTodayStringified as string);
      const weatherForecast = JSON.parse(weatherForecastStringified as string);
      if (weatherToday) dispatch(setReduxWeatherToday(weatherToday));
      if (weatherForecast) dispatch(setReduxWeatherForecast(weatherForecast));
    } catch (error) {
      alert("Error when parsing stored values on weather page init");
    }
  };

  function onAppClose() {
    try {
      const weatherTodayStringified = JSON.stringify(weatherToday);
      const weatherForecastStringified = JSON.stringify(weatherForecast);
      localStorage.setItem("weather", weatherTodayStringified);
      localStorage.setItem("weather-forecast", weatherForecastStringified);
    } catch (error) {
      alert("Error before weather page close");
    }
  };

  useEffect(() => {
    onAppInit();
  },[]);

  useEffect(() => {
    window.addEventListener('beforeunload', onAppClose);
    return () => window.removeEventListener('beforeunload', onAppClose);
  }, [weatherToday, weatherForecast]);
  
}

export default App;
