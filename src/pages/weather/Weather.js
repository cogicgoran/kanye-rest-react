import React, { useEffect } from 'react';
import Header from '../../components/header/Header';
import axios from 'axios';

function Weather() {
    useWeather();

    return (
        <div>
            <Header />
            <h2>Weather</h2>
        </div>
    );
};

function useWeather() {
    function locationSuccess(position) {
        const { latitude, longitude } = position.coords;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(0)}&lon=${longitude.toFixed(0)}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
        console.log(url)
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            }
        })
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(data => console.log(data))
            .catch(error => {
                console.log(error)
            })
        // axios.get(url).then(data => console.log(data)).catch(error => console.log(error));

    }

    function locationError(error) {
        console.log("ERROR:", error);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }, []);
}

export default Weather;