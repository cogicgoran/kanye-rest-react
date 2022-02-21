import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayWeather from '../../components/weather/DisplayWeather.js';
import styles from './Weather.module.css';

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface CoordinatesContainer {
    coords: Coordinates
};

interface Error {
    message: string;
};

type WeatherType = object | null;
type ErrorNull = Error | null;

interface WeatherObject {
    currentWeather: WeatherType;
    isLoading: boolean;
    isError: ErrorNull;
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
    const [currentWeather, setCurrentWeather] = useState<WeatherType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<ErrorNull>(null);

    function locationSuccess(position: CoordinatesContainer): void {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
    }
    
    async function fetchWeather(latitude:number, longitude: number): Promise<void> {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(0)}&lon=${longitude.toFixed(0)}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
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

    function locationError(error: any): void {
        setIsError(error);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }, []);

    return { currentWeather, isLoading, isError }
}

export default Weather;