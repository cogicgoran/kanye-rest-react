import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayWeather from '../../components/weather/DisplayWeather';
import styles from './Weather.module.css';
import { DisplayWeatherProp } from '../../interfaces/interfaces';

interface GeolocationPosition {
    coords: {
        latitude: number;
        longitude: number;
    }
}

interface Error {
    message: string;
};

interface WeatherObject {
    currentWeather: DisplayWeatherProp | null;
    isLoading: boolean;
    isError: Error | null;
}

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

function useWeather(): WeatherObject {
    const [currentWeather, setCurrentWeather] = useState<DisplayWeatherProp | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error | null>(null);

    function locationSuccess(position: GeolocationPosition): void {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
    }

    async function fetchWeather(latitude: number, longitude: number): Promise<void> {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(0)}&lon=${longitude.toFixed(0)}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
        setIsLoading(true);
        setIsError(null);
        try {
            const response = await axios.get(url);
            setCurrentWeather(response.data);
        }
        catch (error: any) {
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
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