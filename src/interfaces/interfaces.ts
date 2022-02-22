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

export interface User {
    email: string,
    password: string
};

export interface SignUpErrors {
    isError: boolean;
    email: {
        isError: boolean;
        errors: string[];
    }
    password: {
        isError: boolean;
        errors: string[];
    }
    passwordConfirm: {
        isError: boolean;
        errors: string[];
    }
}