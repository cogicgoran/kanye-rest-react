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

export interface Quote {
    quote:string;
    id:number;
    time?: number | undefined;
}

export interface QuoteComplete {
    id: number;
    count: number;
    time?: number;
    body: string;
    createdAt: string;
    updatedAt: string | null;
}

export type Forecast = 'today' | '4-day' | '7-day';