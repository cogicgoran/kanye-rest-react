import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    value: {
      weatherToday: null,
      weatherForecast: null
    },
  },
  reducers: {
    setWeatherToday: (state, action) => {
      state.value.weatherToday = action.payload
    },
    setWeatherForecast: (state, action) => {
      state.value.weatherForecast = action.payload
    }
  },
})

export const { setWeatherToday, setWeatherForecast } = weatherSlice.actions;

export default weatherSlice.reducer;