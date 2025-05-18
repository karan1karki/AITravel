import Background from "../components/ui/Background";
import { Typography, Link, useTheme, useMediaQuery } from "@mui/material";

const NotAuthorized = () => {
  const theme = useTheme();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");

  return (
    <Background>
      <div
        className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center"
        style={{
          backgroundColor: theme.palette.background.paper,
          margin: isNotMobileScreen ? null : 5,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: theme.typography.h1.fontSize,
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.primary.main,
            mb: 4,
          }}
        >
          403 - Not Authorized
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.text.primary,
            mb: 6,
          }}
        >
          You do not have permission to access this page.
        </Typography>
        <Link
          href="/"
          sx={{
            color: theme.palette.primary.main,
            "&:hover": {
              color: theme.palette.primary.dark,
            },
            textDecoration: "underline",
          }}
        >
          Go back to the homepage
        </Link>
      </div>
    </Background>
  );
};

export default NotAuthorized;
