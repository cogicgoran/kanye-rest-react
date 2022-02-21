import React from 'react';
import styles from './Button.module.css';

type Props = {
  className: string,
  type?: 'submit' | 'button' | 'reset',
  children: React.ReactNode,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ className, type, children, onClick }: Props): JSX.Element {
  const classes = [className, styles.button].join(" ");
  return (
    <button className={classes} type={type} onClick={onClick}>{children}</button>
  );
};

export default Button;