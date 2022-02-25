import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { setWeatherToday as setReduxWeatherToday, setWeatherForecast as setReduxWeatherForecast } from './store/weather/weather';
import { pushPreviousQuotes, setQuotes } from './store/quotes/quotes';
import { setReduxCurrentUser } from './store/current-user/currentUser';


function App(): JSX.Element {
  const [isAppReady, setIsAppReady] = useState(false);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  useWeatherStore();
  
  useEffect(() => {
    setIsAppReady(true);
  }, [])
  
  const { pathname } = useLocation();
  if( !isAppReady ) return <div>'...authenticating'</div>;

  return (
    <React.Fragment>
      {currentUser && <Header fromReports={pathname === PATHS.REPORTS} />}
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
  const quotes = useAppSelector((state) => state.quotes.value.quotes);

  function onAppInit() {
    try {
      const weatherTodayStringified = localStorage.getItem('weather');
      const weatherForecastStringified = localStorage.getItem('weather-forecast');
      const quotesStringified = localStorage.getItem('quotes');
      const prevQuotesStringified = localStorage.getItem('previous-quotes');
      const currentUserStringified = localStorage.getItem('current-user');
      const weatherToday = JSON.parse(weatherTodayStringified as string);
      const weatherForecast = JSON.parse(weatherForecastStringified as string);
      const quotes = JSON.parse(quotesStringified as string);
      const prevQuotes = JSON.parse(prevQuotesStringified as string);
      const currentUser = JSON.parse(currentUserStringified as string);
      if (weatherToday) dispatch(setReduxWeatherToday(weatherToday));
      if (weatherForecast) dispatch(setReduxWeatherForecast(weatherForecast));
      if (quotes) dispatch(setQuotes(quotes));
      if (prevQuotes) dispatch(pushPreviousQuotes(prevQuotes));
      if (currentUser) dispatch(setReduxCurrentUser(currentUser.email));
    } catch (error) {
      alert("Error when parsing stored values on weather page init");
    }
  };

  function onAppClose() {
    try {
      const weatherTodayStringified = JSON.stringify(weatherToday);
      const weatherForecastStringified = JSON.stringify(weatherForecast);
      const quotesStringified = JSON.stringify(quotes);
      localStorage.setItem("weather", weatherTodayStringified);
      localStorage.setItem("weather-forecast", weatherForecastStringified);
      localStorage.setItem("quotes", quotesStringified);
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
  }, [weatherToday, weatherForecast, quotes]);
  
}

export default App;
