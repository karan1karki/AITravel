import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
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
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import api from "../services/api";
import { setLogin } from "../store/state";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup
      .string("Please provide a valid email address")
      .required("Please provide your email address"),
    password: yup
      .string()
      // .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  })
  .required();

const LoginForm = ({ formType, handleSwap, handleLoginError }) => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const loginUser = async (data) => {
    try {
      const response = await api.post("/auth/token/", {
        email: data.email,
        password: data.password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      const decodedJwt = jwtDecode(access);
      const user = {
        user_id: decodedJwt.user_id,
        firstName: decodedJwt.firstName,
        lastName: decodedJwt.lastName,
        email: decodedJwt.email,
        date_joined: decodedJwt.date_joined,
      };

      // Function to fetch the profile picture
      const fetchProfilePicture = async () => {
        try {
          const response = await api.get("/profile-picture/");
          return response.data.profile_picture; // Return the profile picture URL
        } catch (error) {
          console.error("Error fetching profile picture:", error);
          return null; 
        }
      };

      const profilePicture = await fetchProfilePicture();
      const updatedUser = { ...user, profilePicture };

      dispatch(
        setLogin({
          accessToken: access,
          refreshToken: refresh,
          user: updatedUser,
        })
      );

      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      handleLoginError();
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center p-4"
      onSubmit={handleSubmit(loginUser)}
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
        <Button
          variant="contained"
          type="submit"
          sx={{
            gridColumn: "span 2",
            // borderRadius: 28,
          }}
        >
          Log In
        </Button>

        <Paper
          sx={{
            gridColumn: "span 2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50px",
            mt: "10px",
          }}
          elevation={1}
          className="flex items-center space-x-2"
          onClick={() => loginWithGoogle()}
        >
          <FcGoogle />
          <span>Sign In With Google</span>
        </Paper>

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
          Don’t have an account? <span onClick={handleSwap}>Register here</span>
        </Typography>
      </Box>
    </form>
  );
};
export default LoginForm;
