import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayWeather from '../../components/weather/DisplayWeather.js';
import styles from './Weather.module.css';

interface successLocationObject {
    coords: {
        latitude: number;
        longitude: number;
    }
}

interface errorObject {
    message: string;
}

type WeatherType = object | null;
type Error = errorObject | null;

function Weather(): JSX.Element {
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
    const [currentWeather, setCurrentWeather] = useState<WeatherType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error>(null);

    function locationSuccess(position: successLocationObject): void {
        const { latitude, longitude } = position.coords;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(0)}&lon=${longitude.toFixed(0)}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

        async function fetchWeather(): Promise<void> {
            setIsLoading(true);
            setIsError(null);
            try {
                const data = await axios.get(url);
                setCurrentWeather(data.data);
            }
            catch (error: any) {
                setIsError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchWeather();
    }

    function locationError(error: any): void {
        setIsError(error);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }, []);

    return { currentWeather, isLoading, isError }
}

export default Weather;