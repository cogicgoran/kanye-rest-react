export interface DisplayWeatherProp {
    name: string;
    weather: {
        main: string
        description: string
    }[];
    main: {
        temp: number;
    }
};