import { Route, Routes } from "react-router-dom";

import { HomeScreen } from "./screens/HomeScreen";
import { BrowseScreen } from "./screens/BrowseScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/browse" element={<BrowseScreen />} />
      <Route path="/sign-in" element={<LoginScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
    </Routes>
  );
};

export default App;
