import React from "react";
import styles from './FormErrorMessage.module.css';

function ErrorMessage({ message }: { message: string }): JSX.Element {
    return <div className={styles['form-error-validator']}>{message}</div>;
};

export default ErrorMessage;