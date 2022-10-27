import { ClipLoader } from "react-spinners";

export const BannerLoading: React.FC = () => {
  return (
    <div className="relative w-full h-[700px] flex flex-row justify-center items-center transition duration-200 bg-black">
      <ClipLoader color="red" size={50} speedMultiplier={0.7} />
    </div>
  );
};
