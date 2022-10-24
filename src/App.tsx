import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
    </Routes>
  );
};

export default App;
