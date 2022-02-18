import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import DisplayWeather from '../../components/weather/DisplayWeather';
import styles from './Weather.module.css';

function Weather() {
    const { currentWeather, isLoading, isError } = useWeather();

    return (
        <div>
            <div className={styles['weather']}>
                <h2>Weather</h2>
                {isLoading && "Loading..."}
                {!isLoading && isError && isError.message}
                {!isLoading && !isError && currentWeather && <DisplayWeather weather={currentWeather} />}
            </div>
        </div>
    );
};

function useWeather() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    // Istanbul rainy
    // [61.32, -149.39] = Alaska snowy
    function locationSuccess(position) {
        const { latitude, longitude } = position.coords;
        // const latitude = -21.13;
        // const longitude = 18.79;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(0)}&lon=${longitude.toFixed(0)}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

        async function fetchWeather() {
            setIsLoading(true);
            setIsError(null);
            try {
                const data = await axios.get(url);
                setCurrentWeather(data.data);
            }
            catch (error) {
                setIsError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchWeather();

    }

    function locationError(error) {
        setIsError(error);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }, []);

    return { currentWeather, isLoading, isError }
}

export default Weather;