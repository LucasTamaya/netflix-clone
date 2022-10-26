import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const loginBackgroundImage = {
  backgroundImage:
    "url('https://imgs.search.brave.com/QoS665WMC-p5eW7ptKcgNItqD0GDdekA5KP1N1QucrU/rs:fit:1200:1125:1/g:ce/aHR0cHM6Ly9pc3F1/YWQudHYvd3AtY29u/dGVudC91cGxvYWRz/LzIwMTgvMDgvTmV0/ZmxpeC1CYWNrZ3Jv/dW5kLmpwZw')",
};

export const SigninBackground: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={loginBackgroundImage}
    >
      <div
        className="absolute w-full h-full bg-black/40"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};
