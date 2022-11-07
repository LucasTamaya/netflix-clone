import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";

export const RouterWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
