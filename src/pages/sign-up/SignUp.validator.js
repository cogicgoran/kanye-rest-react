import { getUsers } from "../../helper/storage.functions";

export function validateInputs({email, password, passwordConfirm}, errors){
    validateEmailExists(email, errors);
    validatePassword(password, errors);
    validateConfirmPassword(password, passwordConfirm, errors)
}

function validateEmailExists(email, errors) {
    const regExpSimpleEmail = /\S+@\S+\.\S+/;
    if (!regExpSimpleEmail.test(email)) {
        errors.isError = true;
        errors.email.isError = true;
        errors.email.errors.push("Invalid email");
    }
    // const users = JSON.parse(localStorage.getItem('users')) || [];
    const users = getUsers();
    const matchingEmail = users.find(user => user.email === email);
    if (matchingEmail) {
        errors.isError = true;
        errors.email.isError = true;
        errors.email.errors.push("Email already exists");
    };
};

function validatePassword(password, errors) {
    if (password.length < 8) {
        errors.isError = true;
        errors.password.isError = true;
        errors.password.errors.push('Password must be at least 8 characters long');
    }

    const regExpCapitalLetter = /[A-Z]/;
    const regExpNumber = /\d/;

    if (!(regExpCapitalLetter.test(password) && regExpNumber.test(password))) {
        errors.isError = true;
        errors.password.isError = true;
        errors.password.errors.push('Password must contain at least one capital letter and at least one number');
    }
};

function validateConfirmPassword(password, passwordConfirm, errors) {
    if (password !== passwordConfirm) {
        errors.isError = true;
        errors.passwordConfirm.isError = true;
        errors.passwordConfirm.errors.push('Passwords are not matching!');
    }
};