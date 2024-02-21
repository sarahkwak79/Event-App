import React from "react";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-black p-7 flex justify-between items-center sticky top-0 z-10 w-full">
      <img src="/assets/logo.png" alt="logo" className="size-8 md:size-12" />
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <img
            src={"assets/profile-placeholder.svg"}
            alt="profile"
            className="h-8 w-8 md:h-10 md:w-10 rounded-full"
          />
          <p className="small-semibold md:body-bold">Welcome Sarah!</p>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        >
          Log in
        </button>
      )}
    </header>
  );
};

export default Header;
