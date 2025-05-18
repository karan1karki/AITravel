import { Button, Typography, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import DestinationCard from "../components/DestinationCard";
import data from "../data/destinations.json";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { setMode, setEmailNotifications } from "../store/state";
import ProfileDialog from "../components/ProfileDialog";
import { useState } from "react";
import NavBar from "../components/NavBar";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.primary.main,
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.background.default,
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ProfilePage = () => {
  const theme = useTheme();
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const profilePicture = useSelector((state) => state.user.profilePicture);
  const fullName = firstName + " " + lastName;
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const emailNotification = useSelector((state) => state.emailNotification);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEmailNotificationChange = (event) => {
    dispatch(setEmailNotifications(event.target.emailNotification));
  };

  const handleChange = () => {
    dispatch(setMode());
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-10 mb-10">
        <ProfileDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
        />
        <div
          className="border rounded-lg shadow-lg flex flex-col items-center justify-center w-[80%] h-[80%] p-8"
          style={{ borderColor: theme.palette.primary.main }}
        >
          <div className="mb-6">
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "16px",
                fontSize: "2.5rem",
              }}
            >
              Profile Page
            </Typography>
          </div>
          <div className="flex w-full">
            <div className="flex items-center ml-2">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={fullName.toUpperCase()}
                  src={profilePicture}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "2px solid white",
                  }}
                />
              </StyledBadge>
              <div className="ml-4 flex flex-col items-start">
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "medium",
                    color: theme.palette.text.primary,
                    marginBottom: "8px",
                    marginLeft: "8px",
                  }}
                >
                  {fullName}
                </Typography>
                <Button
                  variant="contained"
                  className="rounded-full"
                  onClick={handleOpenDialog}
                  sx={{
                    borderRadius: "18px",
                    padding: "8px 16px",
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-10 space-y-6">
            <Typography
              variant="h3"
              className="text-center"
              style={{ color: theme.palette.primary.main }}
            >
              Top Destinations
            </Typography>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
              }}
              scrollbar={{ draggable: true }}
              className="w-full"
            >
              {data.slice(0, 6).map((destination, id) => (
                <SwiperSlide key={id}>
                  <DestinationCard
                    title={destination.title}
                    description={destination.description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col w-full items-center justify-center mt-10 space-y-6">
            <Typography
              variant="h3"
              className="text-center"
              style={{ color: theme.palette.primary.main }}
            >
              Settings
            </Typography>
            <div
              className={`w-[95%] flex rounded-lg shadow-lg border`}
              style={{ borderColor: theme.palette.primary.main }}
            >
              <div className="flex flex-col m-6">
                <Typography variant="h6">Email Notifications</Typography>
                <Switch
                  checked={emailNotification}
                  onChange={handleEmailNotificationChange}
                />
                <Typography variant="h6">Theme</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <MaterialUISwitch
                        sx={{ m: 1 }}
                        defaultChecked={false}
                      />
                    }
                    label={mode}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
