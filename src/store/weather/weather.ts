import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherForecast, WeatherType, WeatherResponse } from '../../interfaces/interfaces';
import type { RootState } from '../../store/store';

interface WeatherState {
  value: {
    weatherToday: WeatherResponse | null;
    weatherForecast: WeatherResponse | null;
  }
}

const initialState : WeatherState = {
  value: {
    weatherToday: null,
    weatherForecast: null
  }
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherToday: (state, action: PayloadAction<WeatherResponse>) => {
      state.value.weatherToday = action.payload;
    },
    setWeatherForecast: (state, action : PayloadAction<WeatherResponse>) => {
      state.value.weatherForecast = action.payload;
    }
  },
})

export const { setWeatherToday, setWeatherForecast } = weatherSlice.actions;
export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;