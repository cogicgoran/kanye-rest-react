import { useState, useEffect } from 'react';
import { WeatherForecast } from '../../interfaces/interfaces';
import axios from 'axios';
import { getScructuredResponse, getUrl } from './Weather.functions';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { setWeatherToday as setReduxWeatherToday, setWeatherForecast as setReduxWeatherForecast } from '../../store/weather/weather';

const STORAGE_WEATHER_EXPIRE_TIME = 1000 * 30; // 30 seconds

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
    const reduxCurrentWeather = useAppSelector((state) => state.weather.value);
    const dispatch = useAppDispatch();

    const [currentWeather, setCurrentWeather] = useState<WeatherForecast | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error | null>(null);
    const [forecastType, setForecastType] = useState<Forecast>('today');

    function locationSuccess(position: GeolocationPosition): void {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }, [forecastType]);

    function setWeatherForecast(result: WeatherForecast, forecastType: Forecast, setToStorage: boolean = false, time: number | false = false) {
        if (result.data instanceof Array && forecastType === '3-day') setCurrentWeather({ info: result.info, data: result.data.slice(0, 3) });
        if (result.data instanceof Array && forecastType === '7-day') setCurrentWeather({ info: result.info, data: result.data.slice(0, 7) });
        if ( time === false ) {
            dispatch(setReduxWeatherForecast({ data: result, createdAt: Date.now()}));
        } else {
            dispatch(setReduxWeatherForecast({ data: result, createdAt: time}));
        }
    };

    function setWeatherToday(result: WeatherForecast, setToStorage: boolean = false, time: number | false = false) {
        setCurrentWeather(result);
        if ( time === false ) {
            dispatch(setReduxWeatherToday({ data: result, createdAt: Date.now() }));
        } else {
            dispatch(setReduxWeatherToday({ data: result, createdAt: time }));
        }
    };

    function locationError(error: any): void {
        setIsError(error);
    };

    async function fetchWeather(latitude: number, longitude: number): Promise<void> {
        const url = getUrl(latitude, longitude, forecastType);
        setIsLoading(true);
        setIsError(null);
        try {
            if (forecastType === 'today') {
                const storedWeather = reduxCurrentWeather.weatherToday;
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
                        setWeatherToday(result, false, storedWeather.createdAt)
                    }
                }
            } else {
                const storedForecast = reduxCurrentWeather.weatherForecast;
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
                        setWeatherForecast(result, forecastType, false, storedForecast.createdAt);
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


    return { currentWeather, isLoading, isError, setForecastType }
};