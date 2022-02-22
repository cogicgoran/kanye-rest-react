import { SignUpErrors } from './SignUp.interfaces';

export const errorDefault: SignUpErrors = {
    isError: false,
    email: {
        isError: false,
        errors: []
    }, password:
    {
        isError: false,
        errors: []
    },
    passwordConfirm:
    {
        isError: false,
        errors: []
    }
};