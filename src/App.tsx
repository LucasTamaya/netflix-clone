import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
// import { SignInScreen } from "./screens/SignInScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SigninScreen } from "./screens/SigninScreen";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/sign-in" element={<SigninScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
    </Routes>
  );
};

export default App;
