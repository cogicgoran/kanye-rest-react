import React from 'react';
import * as svgs from '../../assets/svg/weather';
import styles from './DisplayWeather.module.css';
import { WeatherForecast, WeatherType } from '../../interfaces/interfaces';

const weekdaysMap = new Map<number, string>(
    [[0, 'Monday'], [1, 'Tuesday'], [2, 'Wednesday'], [3, 'Thursday'], [4, 'Friday'], [5, 'Saturday'], [6, 'Sunday']]
);

function getIcon(weatherName: string) {
    switch (weatherName) {
        case 'Clear': return <svgs.SVGCloudyDay />
        case 'Clouds': return <svgs.SVGCloudy />
        case 'Rain': return <svgs.SVGRainy3 />
        case 'Snow': return <svgs.SVGSnowy3 />
        default: return <svgs.SVGDay />
    };
};

function getWeekday(day: number): string {
    return weekdaysMap.get(day) as string;
};

interface Props {
    weather: WeatherForecast
}

function DisplayWeather({ weather }: Props): JSX.Element {
    if (weather.data instanceof Array) {
        return (<React.Fragment>
            {weather.data.map((weather, index): JSX.Element => {
                const date = new Date(weather.dt * 1000);
                return (<div className={styles['weather__box']} key={index}><div>
                    {/* {weather.city} <br />
                    {/* {weather.info.city_timezone} */}
                    {getWeekday(date.getDay())}<br />
                    {date.toLocaleString()}
                </div>
                    <div>
                        Weather: {weather.description}
                    </div>
                    <div>
                        Temperature: <br />
                        Min:{weather.tempMin}C <br />
                        Max:{weather.tempMax}C
                    </div>
                    <div className={styles['weather__icon']}>
                        {getIcon(weather.name)}
                    </div></div>)
            })}
        </React.Fragment>)
    }

    const date = new Date(weather.data.dt * 1000);
    return (
        <React.Fragment>
            <div className={styles['weather__box']}>
                    {weather.info.city_timezone}
                <div>
                    {getWeekday(date.getDay())}<br />
                    {date.toLocaleString()}
                </div>
                <div>
                    Weather: {weather.data.description}
                </div>
                <div>
                    Temperature:{weather.data.temp} <br />
                    Min:{weather.data.tempMin}C <br />
                    Max:{weather.data.tempMax}C
                </div>
                <div className={styles['weather__icon']}>
                    {getIcon(weather.data.name)}
                </div>
            </div>
        </React.Fragment>)

}

export default DisplayWeather;