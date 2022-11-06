import { AppWrapper } from "../components/ui/AppWrapper";
export const LostScreen: React.FC = () => {
  return (
    <AppWrapper>
      <div>
        <h1 className="text-white text-center text-3xl sm:text-6xl font-bold mb-5">
          404 Error
        </h1>
        <h2 className="text-white text-center text-2xl sm:text-3xl">
          Looks like you got lost
        </h2>
      </div>
    </AppWrapper>
  );
};
