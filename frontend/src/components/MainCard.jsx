import { Typography, useTheme } from "@mui/material";

const MainCard = () => {
  const theme = useTheme();
  const date = new Date();
  const formattedDate = `${date.getUTCDate()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCFullYear()}`;

  function getRandomFutureDateInRange() {
    const today = new Date();

    const randomDaysInFuture = Math.floor(Math.random() * (14 - 2 + 1)) + 2;

    today.setDate(today.getDate() + randomDaysInFuture);

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="flex flex-row items-center justify-center rounded-lg w-full">
      <div
        className="flex-1 flex flex-col items-center justify-center text-center h-20 rounded-lg border"
        style={{
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: 400,
            color: theme.palette.text.primary,
            marginBottom: "4px",
          }}
        >
          Find your next
        </Typography>
        <Typography
          variant="h4"
          style={{
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          Paris
        </Typography>
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center text-center h-20 rounded-lg border"
        style={{
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: 400,
            color: theme.palette.text.primary,
            marginBottom: "4px",
          }}
        >
          Explore
        </Typography>
        <Typography
          variant="h4"
          style={{
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          Tokyo
        </Typography>
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center text-center h-20 rounded-lg border"
        style={{
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: 400,
            color: theme.palette.text.primary,
            marginBottom: "4px",
          }}
        >
          Experience
        </Typography>
        <Typography
          variant="h4"
          style={{
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          {formattedDate}
        </Typography>
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center text-center h-20 rounded-lg border"
        style={{
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: 400,
            color: theme.palette.text.primary,
            marginBottom: "4px",
          }}
        >
          Start your
        </Typography>
        <Typography
          variant="h4"
          style={{
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          {getRandomFutureDateInRange()}
        </Typography>
      </div>
    </div>
  );
};
export default MainCard;
