import { useTheme } from "@emotion/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm = ({
  formType,
  handleSwap,
  registerToast,
  handleLoginError,
}) => {
  const theme = useTheme();

  return (
    <div
      className={`w-full h-full flex justify-center items-center shadow-lg`}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      {formType === "register" ? (
        <RegisterForm
          formType={formType}
          handleSwap={handleSwap}
          registerToast={registerToast}
        />
      ) : (
        <LoginForm
          formType={formType}
          handleSwap={handleSwap}
          handleLoginError={handleLoginError}
        />
      )}
      ;
    </div>
  );
};

export default AuthForm;
