import React from 'react';
import Header from '../../components/header/Header';
import { PATHS } from '../../helper/Paths';
import { Link } from 'react-router-dom';

function Weather() {
  return (
    <div>
        <Header />
        <h2>Weather</h2>
    </div>
  );
};

export default Weather;