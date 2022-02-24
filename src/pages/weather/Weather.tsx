import React, { useEffect } from 'react';
import DisplayWeather from '../../components/weather/DisplayWeather';
import styles from './Weather.module.css';
import { useWeather } from './useWeather';

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

export default Weather;