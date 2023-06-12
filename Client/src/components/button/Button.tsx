import React from "react";
import styles from "./Button.module.css";

type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "className" | "onClick" | "children"
>;

export const Button: React.FC<ButtonProps> = ({
  type,
  className,
  onClick,
  children,
}) => {
  const ownClasses = styles.button;
  const combinedClasses = `${ownClasses} ${className}`;

  return (
    <button type={type} className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};
