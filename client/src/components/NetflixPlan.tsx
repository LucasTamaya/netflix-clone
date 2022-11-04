import { useState } from "react";
import { ClipLoader } from "react-spinners";
interface Props {
  title: string;
  price: number;
  resolution: string;
  buttonTitle: "Subscribe" | "Current Package";
  isActive: boolean;
  subscribe: () => void;
}

export const NetflixPlan: React.FC<Props> = ({
  title,
  price,
  resolution,
  buttonTitle,
  isActive,
  subscribe,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    if (!isActive) {
      setIsLoading(true);
      subscribe();
    }
  };

  return (
    <div className="flex justify-between items-center px-7">
      <div>
        <h3 className="text-white font-semibold">
          {title} - ${price}
        </h3>
        <p className="text-white">{resolution}</p>
      </div>
      <button
        onClick={handleClick}
        className={`text-white font-semibold w-44 h-11 flex justify-center items-center rounded ${
          isActive
            ? "bg-zinc-500 transition hover:bg-zinc-600"
            : "bg-red-netflix transition hover:bg-red-600"
        }`}
      >
        {isLoading ? (
          <ClipLoader color="white" size={20} speedMultiplier={0.7} />
        ) : (
          buttonTitle
        )}
      </button>
    </div>
  );
};
