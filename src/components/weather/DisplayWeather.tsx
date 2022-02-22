import React from 'react';
import * as svgs from '../../assets/svg/weather';
import styles from './DisplayWeather.module.css';
import { DisplayWeatherProp, WeatherForecast } from '../../interfaces/interfaces';

interface Props {
    weather: DisplayWeatherProp | WeatherForecast[];
    timezone?: string
};

const weekdaysMap = new Map<number, string>(
    [[0,'Monday'],[1,'Tuesday'],[2,'Wednesday'],[3,'Thursday'],[4,'Friday'],[5,'Saturday'],[6,'Sunday']]
)

function DisplayWeather({ weather, timezone }: Props): JSX.Element {
    function getIcon(weatherName: string) {
        switch (weatherName) {
            case 'Clear': return <svgs.SVGCloudyDay />
            case 'Clouds': return <svgs.SVGCloudy />
            case 'Rain': return <svgs.SVGRainy3 />
            case 'Snow': return <svgs.SVGSnowy3 />
            default: return <svgs.SVGDay />
        };
    };
    
    const weatherForecast = weather as WeatherForecast[];
    
    function getWeekday(day: number): string {
        return weekdaysMap.get(day) as string;
    };

    if (weatherForecast instanceof Array) {
        return <React.Fragment>
            {weatherForecast.map((weather, index): JSX.Element => {
                const date = new Date(weather.dt*1000);
                return (<div className={styles['weather__box']} key={index}><div>
                    {weather.timezone}
                    {getWeekday(date.getDay())}<br />
                    {date.toLocaleString()}
                </div>
                    <div>
                        Weather: {weather.weather[0].description}
                    </div>
                    <div>
                        Temperature: <br />
                        Min:{weather.temp.min}C <br />
                        Max:{weather.temp.max}C
                    </div>
                    <div className={styles['weather__icon']}>
                        {getIcon(weather.weather[0].main)}
                    </div></div>)
            })}
        </React.Fragment>
    }

    const weatherNow = weather as DisplayWeatherProp;

    return <div className={styles['weather__box']}>
        <div>
            {weatherNow.name}
        </div>
        <div>
            Weather: {weatherNow.weather[0].description}
        </div>
        <div>
            Temperature: {weatherNow.main.temp}C
        </div>
        <div className={styles['weather__icon']}>
            {getIcon(weatherNow.weather[0].main)}
        </div>
    </div>
};

export default DisplayWeather;