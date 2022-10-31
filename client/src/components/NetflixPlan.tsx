interface Props {
  title: string;
  price: number;
  resolution: string;
  buttonTitle: string;
  isActive: boolean;
  handleClick: any;
}

export const NetflixPlan: React.FC<Props> = ({
  title,
  price,
  resolution,
  buttonTitle,
  isActive,
  handleClick,
}) => {
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
        className={`text-white font-semibold py-2 px-5 rounded ${
          isActive
            ? "bg-zinc-500 transition hover:bg-zinc-600"
            : "bg-red-netflix transition hover:bg-red-600"
        }`}
      >
        {buttonTitle}
      </button>
    </div>
  );
};
