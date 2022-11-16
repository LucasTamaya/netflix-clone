import { ReactNode } from "react";

import { Nav } from "~src/components/Common/Nav";

export const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-zinc-900 px-5 sm:px-10">
      <Nav />
      <div className="w-full max-w-3xl mx-auto h-screen flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};
