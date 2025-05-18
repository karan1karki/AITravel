import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, useMediaQuery } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setLogout } from "../store/state";

const NavBar = () => {
  const theme = useTheme();
  const main = theme.palette.primary.main;
  const background = theme.palette.background.default;
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    { id: 0, label: "Home", to: "/home" },
    { id: 1, label: "Your Recommendations", to: "/recommendations" },
    { id: 2, label: "Profile", to: "/profile" },
  ];

  const logout = () => {
    dispatch(setLogout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isNotMobileScreen ? (
        <div className="flex items-center justify-center">
          <nav
            className="flex items-center justify-center w-[85%] h-12 mt-3 rounded-full shadow-md"
            style={{ backgroundColor: background }}
          >
            <div className="flex flex-1 justify-around m-2">
              {links.map((link) => (
                <NavLink
                  to={link.to}
                  key={link.id}
                  className="flex-1 text-center transition-colors rounded-full p-2"
                  style={({ isActive }) => ({
                    backgroundColor: isActive
                      ? theme.palette.primary.main
                      : hoveredIndex === link.id
                      ? theme.palette.primary.main
                      : "transparent",
                    color: theme.palette.text.primary,
                    fontWeight: isActive ? "bold" : "normal",
                  })}
                  onMouseEnter={() => setHoveredIndex(link.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {link.label}
                </NavLink>
              ))}
              <button
                className="flex-1 text-center transition-colors rounded-full p-2"
                style={{
                  backgroundColor: hoveredIndex === 3 ? main : "transparent",
                  color: theme.palette.hover.primary,
                }}
                onMouseEnter={() => setHoveredIndex(3)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      ) : (
        <div className="flex items-center justify-center w-[85%] mx-auto">
          <nav
            className="relative w-[85%] h-12 mt-3 rounded-full shadow-md"
            style={{ backgroundColor: background }}
          >
            <div className="flex items-center justify-between h-full px-4">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleClick}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 160,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/home");
                      handleClose();
                    }}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/recommendations");
                      handleClose();
                    }}
                  >
                    Your Recommendations
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>
                </Menu>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <button
                  className="flex-1 text-center transition-colors rounded-full p-2"
                  style={{
                    backgroundColor: hoveredIndex === 3 ? main : "transparent",
                    color: theme.palette.hover.primary,
                  }}
                  onMouseEnter={() => setHoveredIndex(3)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={logout}
                >
                  Logout
                </button>
              </Box>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default NavBar;
