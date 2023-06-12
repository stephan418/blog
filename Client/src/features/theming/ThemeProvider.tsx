import React from "react";
import { useAppSelector } from "../../app/hooks";
import { getVars, selectTheme } from "./themingSlice";

interface ThemeProviderProps {
  children: React.ReactNode[];
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useAppSelector(selectTheme);

  return (
    <div style={{ display: "contents", ...getVars(theme) }}>{children}</div>
  );
};
