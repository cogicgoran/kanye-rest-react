import {  WeatherForecast } from '../../interfaces/interfaces';
import { Forecast } from './useWeather';

export function getScructuredResponse(response: any, forecastType: Forecast): WeatherForecast {
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
        };
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
        };
    }
};

export function getUrl(latitude: number, longitude: number, forecast?: Forecast): string {
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