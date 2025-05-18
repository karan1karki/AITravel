import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Avatar,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { setUpdateUser } from "../store/state";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ProfileDialog = ({ open, onClose }) => {
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [profileImage, setProfileImage] = useState(user.profilePicture);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const hasChanges =
      file ||
      formData.firstName !== user.firstName ||
      formData.lastName !== user.lastName ||
      formData.email !== user.email;

    setHasChanges(hasChanges);
  }, [file, formData, user]);

  const togglePasswordState = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const inputRef = useRef(null);

  const handleAvatarClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect only the fields that have changed
    const updatedData = {};
    if (file) updatedData.profile_picture = file;
    if (formData.firstName !== user.firstName) updatedData.firstName = formData.firstName;
    if (formData.lastName !== user.lastName) updatedData.lastName = formData.lastName;
    if (formData.email !== user.email) updatedData.email = formData.email;

    if (Object.keys(updatedData).length === 0) {
      console.error("No changes detected");
      return;
    }

    const apiUrl = "/auth/me/";
    const config = {
      headers: {
        "Content-Type": file ? "multipart/form-data" : "application/json",
      },
    };

    try {
      const response = await api.patch(apiUrl, file ? prepareFormData(updatedData) : updatedData, config);

      console.log("Profile updated:", response.data);
      const updatedUser = response.data;

      // Dispatch the updated user data to the Redux store
      dispatch(
        setUpdateUser({
          ...user,
          ...updatedUser,
          profilePicture: updatedUser.profile_picture,
        })
      );

      // Close the dialog
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const prepareFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return formData;
  };


  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, textAlign: "center" }}
        id="customized-dialog-title"
      >
        <Typography>Your Profile</Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers className="w-full">
        <Box
          display="grid"
          gridTemplateColumns={isNotMobileScreen ? "repeat(2,1fr)" : "repeat(1,1fr)"}
          gap="30px"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            src={profileImage}
            onClick={handleAvatarClick}
            sx={{
              gridColumn: "span 2",
              justifySelf: "center",
              alignSelf: "center",
              width: 100,
              height: 100,
              cursor: "pointer",
            }}
          />
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              gridColumn: "span 2",
            }}
            fullWidth
          />
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              gridColumn: "span 2",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
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
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          autoFocus
          onClick={handleSubmit}
          disabled={!hasChanges}
        >
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ProfileDialog;
