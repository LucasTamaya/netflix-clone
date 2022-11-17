import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

const mockedHelmetContext = {};

export const HelmetWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <HelmetProvider context={mockedHelmetContext}>{children}</HelmetProvider>
  );
};
