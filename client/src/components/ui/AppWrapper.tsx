import { ReactNode } from "react";

import { Nav } from "../common/Nav";

export const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-zinc-900 px-14">
      <Nav />
      <div className="w-full max-w-3xl mx-auto h-screen flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};
