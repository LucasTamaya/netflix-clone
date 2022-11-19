import { useNavigate } from "react-router-dom";

interface Props {
  handleCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogoutModal: React.FC<Props> = ({ handleCancel }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="absolute top-0 left-0 z-30 w-full h-screen flex justify-center items-center bg-black/50  px-5 sm:px-10">
      <div className="bg-zinc-900 p-10 rounded">
        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-8">
          Are you sure you want to logout?
        </h3>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <button
            className="w-full sm:w-44 h-11 text-white font-semibold mb-5 sm:mb-0 bg-zinc-500 rounded hover:bg-zinc-600"
            onClick={() => handleCancel(false)}
          >
            Cancel
          </button>
          <button
            data-testid="logoutConfirmBtn"
            className="w-full sm:w-44 h-11 text-white font-semibold bg-red-netflix rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
