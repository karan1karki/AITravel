import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import api from "../services/api";
const schema = yup
  .object({
    firstName: yup.string().required("Please Provide your First Name"),
    lastName: yup.string().required("Please provide your Last Name"),
    email: yup
      .string("Please provide a valid email address")
      .required("Please provide your email address"),
    password: yup
      .string()
      // .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      // .required("Password confirmation is required"),
  })
  .required();

const RegisterForm = ({ formType, handleSwap, registerToast }) => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordState = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerUser = async (data) => {
    delete data["passwordConfirmation"];
    try {
      const response = await api.post("/auth/register/", {
        firstName: data["firstName"],
        lastName: data["lastName"],
        email: data["email"],
        password: data["password"],
      });

      console.log("register response : ", response);
      registerToast();
    } catch (error) {
      console.log("error registering user : ", error);
    }
  };
  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center p-4"
      onSubmit={handleSubmit(registerUser)}
    >
      <Box
        display="grid"
        gap="10px"
        // m={4}
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{
          width: isNonMobileScreen ? "500px" : undefined,
          maxWidth: isNonMobileScreen ? "100%" : undefined,
          height: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            gridColumn: "span 2",
            color: theme.palette.primary.main, // Use theme primary color
            fontWeight: theme.typography.fontWeightBold, // Use theme font weight
            textAlign: "center",
            mb: 3,
            fontFamily: theme.typography.fontFamily, // Use theme font family
            letterSpacing: "1.5px",
            borderBottom: `4px solid ${theme.palette.primary.main}`, // Use theme primary color for border
            paddingBottom: "8px",
            position: "relative",
            overflow: "hidden",
            transition: "color 0.4s ease, transform 0.4s ease",
            "&:hover": {
              color: theme.palette.background.paper, // Use theme background paper color for hover
              transform: "translateY(-5px)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(120deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
              opacity: 0,
              transition: "opacity 0.4s ease",
            },
            "&:hover::before": {
              opacity: 1,
            },
          }}
        >
          {formType.toUpperCase()}
        </Typography>

        {/* First Name */}
        <TextField
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          label="First Name"
          variant="outlined"
          className="rounded-lg"
          fullWidth
          sx={{
            gridColumn: isNonMobileScreen ? null : "span 2",
          }}
          InputProps={{
            endAdornment: (
              <PermIdentityIcon position="end">
                <EmailIcon /> {/* Replace with your desired icon */}
              </PermIdentityIcon>
            ),
          }}
        />

        {/* Last Name */}
        <TextField
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          label="Last Name"
          variant="outlined"
          fullWidth
          sx={{
            gridColumn: isNonMobileScreen ? null : "span 2",
          }}
          InputProps={{
            endAdornment: (
              <PermIdentityIcon position="end">
                <EmailIcon /> {/* Replace with your desired icon */}
              </PermIdentityIcon>
            ),
          }}
        />

        {/* Email */}
        <TextField
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            gridColumn: "span 2",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon /> {/* Replace with your desired icon */}
              </InputAdornment>
            ),
          }}
        />

        {/* Password */}
        <FormControl
          variant="outlined"
          error={!!errors.password}
          fullWidth
          sx={{
            gridColumn: "span 2",
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            {...register("password")}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordState}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>

        {/* Confirm Password */}
        <FormControl
          variant="outlined"
          error={!!errors.passwordConfirmation}
          fullWidth
          sx={{
            gridColumn: "span 2",
          }}
        >
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            {...register("passwordConfirmation")}
            id="outlined-adornment-confirm-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordState}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
          <FormHelperText>
            {errors.passwordConfirmation?.message}
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{
            gridColumn: "span 2",
            // borderRadius: 28,
          }}
        >
          Register
        </Button>

        <Typography
          m={2}
          sx={{
            textAlign: "center",
            fontSize: theme.typography.body1.fontSize, // Use theme font size
            fontWeight: theme.typography.fontWeightMedium, // Use theme font weight
            color: theme.palette.text.primary, // Use theme text color
            "& span": {
              color: theme.palette.primary.main, // Use theme primary color for the link
              fontWeight: theme.typography.fontWeightBold, // Use theme font weight for bold text
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                color: theme.palette.primary.dark, // Use a darker shade of theme primary color on hover
              },
            },
            gridColumn: "span 2",
          }}
          component="p"
        >
          Already have an account?
          <span onClick={handleSwap}> Sign In</span>
        </Typography>
      </Box>
    </form>
  );
};
export default RegisterForm;
