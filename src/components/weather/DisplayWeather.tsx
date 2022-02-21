import React from 'react';
import * as svgs from '../../assets/svg/weather';
import styles from './DisplayWeather.module.css';
import { DisplayWeatherProp } from '../../interfaces/interfaces';

interface Props {
    weather: DisplayWeatherProp;
};

function DisplayWeather({ weather }: Props): JSX.Element {
    function getIcon(weatherName: string) {
        switch (weatherName) {
            case 'Clear': return <svgs.SVGCloudyDay />
            case 'Clouds': return <svgs.SVGCloudy />
            case 'Rain': return <svgs.SVGRainy3 />
            case 'Snow': return <svgs.SVGSnowy3 />
            default: return <svgs.SVGDay />
        };
    };

    return <React.Fragment>
        <div>
            {weather.name}
        </div>
        <div>
            Weather: {weather.weather[0].description}
        </div>
        <div>
            Temperature: {weather.main.temp}C
        </div>
        <div className={styles['weather__icon']}>
            {getIcon(weather.weather[0].main)}
        </div>
    </React.Fragment>
};

export default DisplayWeather;