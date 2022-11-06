import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "@stripe/stripe-js";

import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { SelectPlansScreen } from "./screens/SelectPlansScreen";
import { CheckoutSuccessScreen } from "./screens/CheckoutSuccessScreen";
import { LostScreen } from "./screens/LostScreen";

// lazy load components that are used when the user has logged in
const BrowseScreen = lazy(() => import("./screens/BrowseScreen"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"));

const App: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/select-plans" element={<SelectPlansScreen />} />
        <Route path="/checkout-success" element={<CheckoutSuccessScreen />} />
        <Route path="/browse" element={<BrowseScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<LostScreen />} />
      </Routes>
    </Suspense>
  );
};

export default App;
