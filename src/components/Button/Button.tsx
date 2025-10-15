import React from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  id,
}) => (
  <button
    className={classes.Button}
    onClick={onClick}
    type={type}
    data-testid={id}
  >
    {label}
  </button>
);
