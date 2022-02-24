export interface User {
    email: string,
    password: string
};

export interface WeatherResponse {
    createdAt: number;
    data: WeatherForecast
}

export interface WeatherForecast {
    info: {
        city_timezone: string;
    };
    data: WeatherType[] | WeatherType;
};

export interface WeatherType {
    city?: string;
    name: string;
    description: string;
    temp?: number;
    tempMin: number;
    tempMax: number;
    dt: number;
}

export type Forecast = 'today' | '4-day' | '7-day';