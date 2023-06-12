import React from "react";
import styles from "./Button.module.css";

type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "className" | "onClick" | "children"
> & {
  color?: "primary" | "accent" | "secondary" | "secondaryAccent" | "warn";
};

export const Button: React.FC<ButtonProps> = ({
  type,
  className,
  onClick,
  children,
  color = "secondaryAccent",
}) => {
  const ownClasses = styles.button;
  const combinedClasses = `${ownClasses} ${className}`;

  return (
    <button
      style={{ backgroundColor: `var(--${color})` }}
      type={type}
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
