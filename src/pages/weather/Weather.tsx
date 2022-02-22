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
};

interface Error {
    message: string;
};

interface WeatherObject {
    currentWeather: DisplayWeatherProp | null;
    isLoading: boolean;
    isError: Error | null;
    fetchWeather:(lat: number, lon: number, forecast?: "today" | "4-day" | "7-day" | undefined) => Promise<void>;
};

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

    function getUrl(latitude: number, longitude: number, forecast?: 'today' | '4-day' | '7-day'): string {
        const latitudeFormated: string = latitude.toFixed(0);
        const longitudeFormated: string = longitude.toFixed(0);
        switch(forecast){
            case 'today':
                return `http://api.openweathermap.org/data/2.5/weather?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
            case '4-day':
                return `http://api.openweathermap.org/data/2.5/forecast/hourly?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
            case '7-day':
                return `http://api.openweathermap.org/data/2.5/onecall?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
            default:
                return `http://api.openweathermap.org/data/2.5/weather?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
        }
    }

    async function fetchWeather(latitude: number, longitude: number, forecast: 'today' | '4-day' | '7-day' = 'today'): Promise<void> {
        const url = getUrl(latitude, longitude, forecast);
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

    return { currentWeather, isLoading, isError, fetchWeather }
}

export default Weather;