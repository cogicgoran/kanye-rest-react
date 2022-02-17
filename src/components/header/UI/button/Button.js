import React from 'react';
import styles from './Button.module.css';

const Button = React.forwardRef(function({className, type, children, onClick}, ref){
  const classes = [className, styles.button].join(" ");
  return (
    <button ref={ref} className={classes} type={type} onClick={onClick}>{children}</button>
  );
})

// function Button({className, type, children, onClick}) {
//     const classes = [className, styles.button].join(" ");
//   return (
//     <button className={classes} type={type} onClick={onClick}>{children}</button>
//   );
// };

export default Button;