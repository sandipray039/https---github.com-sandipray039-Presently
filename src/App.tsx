import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import "./App.css"

const App = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
