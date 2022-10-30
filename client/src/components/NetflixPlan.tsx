interface Props {
  title: string;
  resolution: string;
  buttonTitle: string;
  isActive: boolean;
}

export const NetflixPlan: React.FC<Props> = ({
  title,
  resolution,
  buttonTitle,
  isActive,
}) => {
  return (
    <div className="flex justify-between items-center px-7">
      <div>
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-white">{resolution}</p>
      </div>
      <button
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
