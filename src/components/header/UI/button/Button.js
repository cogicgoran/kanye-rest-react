import React from 'react';
import styles from './Button.module.css';

function Button({className, children, onClick}) {
    const classes = [className, styles.button].join(" ");
  return (
    <button className={classes} onClick={onClick}>{children}</button>
  );
};

export default Button;