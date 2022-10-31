import { Route, Routes } from "react-router-dom";
import "@stripe/stripe-js";

import { HomeScreen } from "./screens/HomeScreen";
import { BrowseScreen } from "./screens/BrowseScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SelectPlansScreen } from "./screens/SelectPlansScreen";
import { CheckoutSuccessScreen } from "./screens/CheckoutSuccessScreen";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/browse" element={<BrowseScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/select-plans" element={<SelectPlansScreen />} />
      <Route path="/checkout-success" element={<CheckoutSuccessScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
    </Routes>
  );
};

export default App;
