export const BannerError: React.FC = () => {
  return (
    <div className="relative w-full h-[700px] transition duration-200 bg-black">
      <h1 className="absolute top-1/3 ml-10 text-white text-4xl font-extrabold">
        Oops, something went wrong on the server...
      </h1>
    </div>
  );
};
