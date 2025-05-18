import { useState } from "react";
import AuthForm from "./AuthForm";
import travel from "../assets/travel.jpg";

const AuthForms = ({registerToast, handleLoginError}) => {
  const [isSwapped, setIsSwapped] = useState(false);
  const [formType, setFormType] = useState("login");

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    setFormType((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div className="relative w-full flex justify-center items-center mt-10 p-6">
      {/* Left Div */}
      <div
        className={`w-[90%] sm:w-[500px] h-[500px] flex justify-center items-center bg-blue-500 text-white cursor-pointer transform transition-transform duration-500 ${
          isSwapped ? "translate-x-full sm:translate-x-[500px]" : ""
        }`}
      >
        <AuthForm formType={formType} handleSwap={handleSwap} registerToast={registerToast} handleLoginError={handleLoginError}/>
      </div>

      {/* Right Div */}
      <div
        className={`w-[90%] sm:w-[500px] h-[500px] flex justify-center items-center bg-blue-500 text-white cursor-pointer transform transition-transform duration-500 ${
          isSwapped ? "-translate-x-full sm:-translate-x-[500px]" : ""
        }`}
      >
        <img src={travel} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default AuthForms;
