import { useState, useEffect } from 'react';
import { WeatherForecast } from '../../interfaces/interfaces';
import axios from 'axios';
import { getScructuredResponse, getUrl } from './Weather.functions';

const STORAGE_WEATHER_EXPIRE_TIME = 1000 * 60 * 3;

interface WeatherObject {
    currentWeather: WeatherForecast | null;
    isLoading: boolean;
    isError: Error | null;
    setForecastType: React.Dispatch<React.SetStateAction<Forecast>>;
};

interface GeolocationPosition {
    coords: {
        latitude: number;
        longitude: number;
    }
};

interface Error {
    message: string;
};

export type Forecast = 'today' | '3-day' | '7-day';

export function useWeather(): WeatherObject {
    const [currentWeather, setCurrentWeather] = useState<WeatherForecast | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error | null>(null);
    const [forecastType, setForecastType] = useState<Forecast>('today');

    function locationSuccess(position: GeolocationPosition): void {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
    }

    function setWeatherForecast(result: WeatherForecast, forecastType: Forecast, setToStorage?: boolean) {
        if (result.data instanceof Array && forecastType === '3-day') setCurrentWeather({ info: result.info, data: result.data.slice(0, 3) });
        if (result.data instanceof Array && forecastType === '7-day') setCurrentWeather({ info: result.info, data: result.data.slice(0, 7) });
        if (setToStorage) localStorage.setItem('weather-forecast', JSON.stringify({ data: result, createdAt: Date.now() }));
    }

    function setWeatherToday(result: WeatherForecast, setToStorage?: boolean) {
        setCurrentWeather(result);
        if(setToStorage) localStorage.setItem('weather', JSON.stringify({ data: result, createdAt: Date.now() }));
    }

    async function fetchWeather(latitude: number, longitude: number): Promise<void> {
        const url = getUrl(latitude, longitude, forecastType);
        setIsLoading(true);
        setIsError(null);
        try {
            if (forecastType === 'today') {
                const storedWeather = JSON.parse(localStorage.getItem('weather') as any);
                let result: WeatherForecast;
                if (!storedWeather) {
                    result = getScructuredResponse(await axios.get(url), forecastType);
                    setWeatherToday(result, true)
                } else {
                    const createdAt: number = storedWeather.createdAt;
                    if (Date.now() - createdAt > STORAGE_WEATHER_EXPIRE_TIME) {
                        result = getScructuredResponse(await axios.get(url), forecastType);
                        setWeatherToday(result, true);
                    } else {
                        result = storedWeather.data;
                        setWeatherToday(result)
                    }
                }
            } else {
                const storedForecast = JSON.parse(localStorage.getItem('weather-forecast') as any);
                let result: WeatherForecast;
                if (!storedForecast) {
                    result = getScructuredResponse(await axios.get(url), forecastType);
                    setWeatherForecast(result, forecastType, true);
                } else {
                    const createdAt: number = storedForecast.createdAt;
                    if (Date.now() - createdAt > STORAGE_WEATHER_EXPIRE_TIME) {
                        result = getScructuredResponse(await axios.get(url), forecastType);
                        setWeatherForecast(result, forecastType, true);
                    } else {
                        result = storedForecast.data;
                        setWeatherForecast(result, forecastType);
                    }
                }
            }
        }
        catch (error: any) {
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    };

    function locationError(error: any): void {
        setIsError(error);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }, [forecastType]);

    return { currentWeather, isLoading, isError, setForecastType }
}