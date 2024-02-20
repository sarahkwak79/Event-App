import { Outlet } from "react-router-dom";
import Login from "../components/Login";

const LoginPage: React.FC = () => {
  return (
    <>
      <div className="h-screen flex justify-center">
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          <Outlet />
          <Login />
        </section>

        <img
          src="/assets/side-img.png"
          alt="side-img"
          className="hidden xl:block h-screen w-1/2 object-cover bg no-repeat"
        />
      </div>
    </>
  );
};

export default LoginPage;
