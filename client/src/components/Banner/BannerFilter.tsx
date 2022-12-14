export const BannerFilter: React.FC = () => {
  return (
    <div
      data-testid="filter"
      className="absolute top-0 left-0 w-full h-full"
      style={{
        backgroundImage:
          "linear-gradient(180deg, transparent, rgba(37,37,37,0.61), #111)",
      }}
    ></div>
  );
};
