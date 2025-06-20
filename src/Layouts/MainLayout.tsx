import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main style={{minHeight:"85vh"}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
