import { useSelector } from "react-redux";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthForms from "../components/AuthForms";
import Background from "../components/ui/Background";

const AuthPage = () => {
  const mode = useSelector((state) => state.mode);
  const registerToast = () => {
    toast.success("Registered Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: { mode },
      transition: Bounce,
    });
  };

  const handleLoginError = () => {
    toast.error("Invalid Credentials", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  return (
    <Background>
      <ToastContainer />
      <AuthForms
        registerToast={registerToast}
        handleLoginError={handleLoginError}
      />
    </Background>
  );
};
export default AuthPage;
