import React from 'react';
import styles from './Button.module.css';

function Button({className, type, children, onClick}) {
    const classes = [className, styles.button].join(" ");
  return (
    <button className={classes} type={type} onClick={onClick}>{children}</button>
  );
};

export default Button;