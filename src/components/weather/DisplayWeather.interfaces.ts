export interface DisplayWeatherProp {
    weather: {
        name: string;
        weather: {
            main: string
            description: string
        }[];
        main: {
            temp: number;
        }
    }
};