import { Nav } from "../components/common/Nav";

export const CheckoutSuccessScreen: React.FC = () => {
  const selectedPlan = localStorage.getItem("selectedPlan");

  console.log(selectedPlan);

  return (
    <div className="bg-zinc-900 px-14">
      <Nav />
      <div className="w-full max-w-3xl mx-auto h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-5xl font-bold mb-5">
          Checkout Success!
        </h1>
        <h2 className="text-white text-2xl">
          You are going to be redirected in a moment...
        </h2>
      </div>
    </div>
  );
};
