export function validateInputs({email, password, passwordConfirm}, errors){
    console.log(email, errors);
    validateEmailExists(email, errors);
    validatePassword(password, errors);
    validateConfirmPassword(password, passwordConfirm, errors)
}

function validateEmailExists(email, users, errors) {
    const regExpSimpleEmail = /\S+@\S+\.\S+/;
    if (!regExpSimpleEmail.test(email)) {
        errors.isError = true;
        errors.email.isError = true;
        errors.email.errors.push("Invalid email");
    }

    // const matchingEmail = users.find(user => user.email === email);
    // if (matchingEmail) {
    //     createValidatorError(emailWrapper, "Email already exists");
    //     setIsErrorTrue();
    // };
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