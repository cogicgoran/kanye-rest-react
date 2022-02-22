import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayWeather from '../../components/weather/DisplayWeather';
import styles from './Weather.module.css';
import { WeatherType, WeatherForecast } from '../../interfaces/interfaces';


// three minutes
const STORAGE_WEATHER_EXPIRE_TIME = 1000 * 60 * 3;

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
    currentWeather: WeatherForecast | null;
    isLoading: boolean;
    isError: Error | null;
    setForecastType: React.Dispatch<React.SetStateAction<Forecast>>;
};

function Weather(): JSX.Element {
    const { currentWeather, isLoading, isError, setForecastType } = useWeather();

    return (
        <div>
            <div className={styles['weather']}>
                <div className={styles['weather__options']}>
                    <span onClick={() => setForecastType('today')}>Today</span>
                    <span onClick={() => setForecastType('3-day')}>3-day</span>
                    <span onClick={() => setForecastType('7-day')}>7-day</span>
                </div>
                <h2>Weather</h2>
                <div className={styles['weather__boxes-wrapper']}>
                    {isLoading && "Loading..."}
                    {!isLoading && isError && isError.message}
                    {!isLoading && !isError && currentWeather && <DisplayWeather weather={currentWeather} />}
                </div>
            </div>
        </div>
    );
};

type Forecast = 'today' | '3-day' | '7-day';

function useWeather(): WeatherObject {
    const [currentWeather, setCurrentWeather] = useState<WeatherForecast | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<Error | null>(null);
    const [forecastType, setForecastType] = useState<Forecast>('today');

    function locationSuccess(position: GeolocationPosition): void {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
    }

    function getUrl(latitude: number, longitude: number, forecast?: Forecast): string {
        const latitudeFormated: string = latitude.toFixed(0);
        const longitudeFormated: string = longitude.toFixed(0);
        switch (forecast) {
            case 'today':
                return `http://api.openweathermap.org/data/2.5/weather?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
            case '3-day':
            case '7-day':
                return `http://api.openweathermap.org/data/2.5/onecall?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
            default:
                return `http://api.openweathermap.org/data/2.5/weather?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
        }
    }

    function getScructuredResponse(response: any): WeatherForecast {
        if (forecastType === 'today') {
            return {
                info: {
                    city_timezone: response.data.timezone
                },
                data: {
                    city: response.data.name,
                    name: response.data.weather[0].main,
                    description: response.data.weather[0].description,
                    temp: response.data.main.temp,
                    tempMin: response.data.main.temp_min,
                    tempMax: response.data.main.temp_max,
                    dt: response.data.dt,
                }
            }
        } else {
            return {
                info: {
                    city_timezone: response.data.timezone
                },
                data: response.data.daily.map((daily_weather: any) => {
                    return {
                        name: daily_weather.weather[0].main,
                        description: daily_weather.weather[0].description,
                        tempMin: daily_weather.temp.min,
                        tempMax: daily_weather.temp.max,
                        dt: daily_weather.dt
                    }
                })
            }
        }

    }

    async function fetchWeather(latitude: number, longitude: number): Promise<void> {
        const url = getUrl(latitude, longitude, forecastType);
        setIsLoading(true);
        setIsError(null);
        try {
            if (forecastType === 'today') {
                const storedWeather = JSON.parse(localStorage.getItem('weather') as any);
                let result;
                if (!storedWeather) {
                    result = getScructuredResponse(await axios.get(url));
                    setCurrentWeather(result);
                    localStorage.setItem('weather', JSON.stringify({ data: result, createdAt: Date.now() }));
                } else {
                    const createdAt: number = storedWeather.createdAt;
                    if (Date.now() - createdAt > STORAGE_WEATHER_EXPIRE_TIME) {
                        result = getScructuredResponse(await axios.get(url));
                        setCurrentWeather(result);
                        localStorage.setItem('weather', JSON.stringify({ data: result, createdAt: Date.now() }));
                    } else {
                        result = storedWeather.data;
                        setCurrentWeather(result);
                    }
                }
            } else {
                const storedForecast = JSON.parse(localStorage.getItem('weather-forecast') as any);
                let result;
                if (!storedForecast) {
                    result = getScructuredResponse(await axios.get(url));
                    // Maybe a hack, must be a better way to check for type
                    if(result.data instanceof Array && forecastType === '3-day') setCurrentWeather({info:result.info, data: result.data.slice(0,3)});
                    if(result.data instanceof Array && forecastType === '7-day') setCurrentWeather({info:result.info, data: result.data.slice(0,7)});
                    localStorage.setItem('weather-forecast', JSON.stringify({ data: result, createdAt: Date.now() }));
                } else {
                    const createdAt: number = storedForecast.createdAt;
                    if (Date.now() - createdAt > STORAGE_WEATHER_EXPIRE_TIME) {
                        result = getScructuredResponse(await axios.get(url));
                        if(result.data instanceof Array && forecastType === '3-day') setCurrentWeather({info:result.info, data: result.data.slice(0,3)});
                        if(result.data instanceof Array && forecastType === '7-day') setCurrentWeather({info:result.info, data: result.data.slice(0,7)});
                        localStorage.setItem('weather-forecast', JSON.stringify({ data: result, createdAt: Date.now() }));
                    } else {
                        result = storedForecast.data;
                        if(result.data instanceof Array && forecastType === '3-day') setCurrentWeather({info:result.info, data: result.data.slice(0,3)});
                        if(result.data instanceof Array && forecastType === '7-day') setCurrentWeather({info:result.info, data: result.data.slice(0,7)});
                    }
                }
            }
        }
        catch (error: any) {
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    }

    function locationError(error: any): void {
        setIsError(error);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }, [forecastType]);

    return { currentWeather, isLoading, isError, setForecastType }
}

export default Weather;