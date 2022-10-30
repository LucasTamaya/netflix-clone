import { authenticate } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../redux/index";

export const useAuthUser = () => {
  const dispatch = useAppDispatch();

  return () => dispatch(authenticate(true));
};
