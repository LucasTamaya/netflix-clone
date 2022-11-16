import { useNavigate } from "react-router-dom";

import { AppWrapper } from "~src/components/Ui/AppWrapper";

export const LostScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppWrapper>
      <div className="flex flex-col items-center gap-y-5">
        <h1 className="text-white text-center text-3xl sm:text-6xl font-bold">
          404 Error
        </h1>
        <h2 className="text-white text-center text-2xl sm:text-3xl">
          Looks like you got lost
        </h2>
        <button
          onClick={() => navigate("/")}
          className="text-white text-xs sm:text-base font-semibold w-32 sm:w-44 h-9 sm:h-11 flex justify-center items-center rounded bg-red-netflix transition hover:bg-red-600"
        >
          Go back home
        </button>
      </div>
    </AppWrapper>
  );
};
