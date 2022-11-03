import { ReactNode } from "react";

import { Nav } from "./Nav";

export const ProfileWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="bg-zinc-900 px-14">
      <Nav />
      <div className="w-full max-w-3xl mx-auto h-screen flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};
