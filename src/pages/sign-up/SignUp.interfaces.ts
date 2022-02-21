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