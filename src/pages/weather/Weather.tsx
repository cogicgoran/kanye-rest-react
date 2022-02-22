import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayWeather from '../../components/weather/DisplayWeather';
import styles from './Weather.module.css';
import { DisplayWeatherProp, WeatherForecast } from '../../interfaces/interfaces';

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
    currentWeather: DisplayWeatherProp | WeatherForecast[] | null;
    isLoading: boolean;
    isError: Error | null;
    setForecastType: React.Dispatch<React.SetStateAction<Forecast>>;
};

function Weather(): JSX.Element {
    const { currentWeather, isLoading, isError, setForecastType } = useWeather();

    return (
        <div>
            <div className={styles['weather']}>
                <div>
                    <span onClick={() => setForecastType('today')}>Today</span>
                    <span onClick={() => setForecastType('3-day')}>3-day</span>
                    <span onClick={() => setForecastType('7-day')}>7-day</span>
                </div>
                <h2>Weather</h2>
                <div className={styles['weather__boxes-wrapper']}>
                    {isLoading && "Loading..."}
                    {!isLoading && isError && isError.message}
                    {!isLoading && !isError && currentWeather && <DisplayWeather weather={currentWeather}/>}
                </div>
            </div>
        </div>
    );
};

type Forecast = 'today' | '3-day' | '7-day';

function useWeather(): WeatherObject {
    const [currentWeather, setCurrentWeather] = useState<DisplayWeatherProp | WeatherForecast[] | null>(null);
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
        switch(forecast){
            case 'today':
                return `http://api.openweathermap.org/data/2.5/weather?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
            case '3-day':
            case '7-day':
                return `http://api.openweathermap.org/data/2.5/onecall?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
            default:
                return `http://api.openweathermap.org/data/2.5/weather?lat=${latitudeFormated}&lon=${longitudeFormated}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
        }
    }

    async function fetchWeather(latitude: number, longitude: number): Promise<void> {
        const url = getUrl(latitude, longitude, forecastType);
        setIsLoading(true);
        setIsError(null);
        try {
            let isExpired = false;
            if(forecastType !== 'today') {
                var {response: getExistingWeather, createdAt} = JSON.parse(localStorage.getItem('weather') as string) || {};
                // 3 minutes differential ( 1000 * 60 * 3 [ms])
                isExpired = createdAt ? Date.now() - createdAt > 1000 * 60 * 3: true;
            }
            var response = (!isExpired && getExistingWeather) || await axios.get(url);

            if(forecastType !== 'today') {
                if(!getExistingWeather) localStorage.setItem('weather', JSON.stringify({response, createdAt: Date.now()}));
                if(forecastType === '3-day') setCurrentWeather(response.data.daily.slice(0,3));
                if(forecastType === '7-day') setCurrentWeather(response.data.daily.slice(0,7));
            }else {
                setCurrentWeather(response.data);
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

    return { currentWeather, isLoading, isError, setForecastType}
}

export default Weather;