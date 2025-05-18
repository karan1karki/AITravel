import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainCard from "../components/MainCard";
import MainRecommendationCard from "../components/MainRecommendationCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalHospital from "@mui/icons-material/LocalHospital";

const MainPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");

  return (
    <div className="flex flex-col items-center justify-center">
      <nav
        className="flex items-center w-[95%] h-14 mt-3 rounded-full shadow-lg px-4"
        style={{ backgroundColor: theme.palette.primary.default }}
      >
        <img
          src={"/travel-logo.png"}
          alt="AI Travel App Icon"
          className="h-10 w-10 ml-2"
        />

        <Typography
          variant="h4"
          sx={{
            ml: 2,
            fontWeight: "bold",
            letterSpacing: "0.05em",
            color: theme.palette.primary.main,
          }}
        >
          AI Travel App
        </Typography>

        <span style={{ flex: "auto" }}></span>

        <Button
          variant="contained"
          sx={{
            borderRadius: "18px",
          }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </nav>

      <div className="relative flex flex-col items-center justify-center w-[85%] mt-6">
        <img
          src={"/travel-main.jpg"}
          className="rounded-lg w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Typography
            variant="h1"
            className="text-white text-4xl font-bold text-center"
          >
            Explore Personalized Travel Suggestions
          </Typography>
        </div>
        <div className="w-[85%] -mt-10 rounded-lg">
          <MainCard />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-6">
        <div>
          <Typography
            variant="h2"
            className="text-center"
            style={{
              color: theme.palette.text.primary,
              fontWeight: "bold",
            }}
          >
            Top Recommendations
          </Typography>
        </div>
        <div
          className={`flex ${
            isNotMobileScreen ? "flex-row" : "flex-col"
          } items-center justify-center ${
            isNotMobileScreen ? "gap-5" : "gap-0"
          }`}
        >
          <MainRecommendationCard
            imagePath={"/cities/london.jpg"}
            cityName={"London"}
          />
          <MainRecommendationCard
            imagePath={"/cities/paris.jpg"}
            cityName={"Paris"}
          />
          <MainRecommendationCard
            imagePath={"/cities/dubai.jpg"}
            cityName={"Dubai"}
          />
          <MainRecommendationCard
            imagePath={"/cities/sydney.jpg"}
            cityName={"Sydney"}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 p-4">
          <div
            className="flex flex-col items-center justify-center w-full h-64 p-6 rounded-lg shadow-md"
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            <AttachMoneyIcon
              fontSize="large"
              className="mb-4"
              style={{
                color: theme.palette.text.primary,
              }}
            />

            <Typography
              variant="h4"
              className="text-center mb-2 font-bold"
              style={{
                color: theme.palette.text.primary,
              }}
            >
              Refunds & Cancelation
            </Typography>

            <Typography
              variant="h6"
              className="text-center pt-6"
              style={{ lineHeight: 1.5, color: theme.palette.text.primary }}
            >
              Flight Canceled! <br />
              Instant refunds available
            </Typography>
          </div>

          <div
            className="flex flex-col items-center justify-center w-full h-64 p-6 rounded-lg shadow-md"
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            {" "}
            <CreditCardIcon
              fontSize="large"
              className="mb-4"
              style={{
                color: theme.palette.text.primary,
              }}
            />
            <Typography
              variant="h4"
              className="text-center mb-2 font-bold"
              style={{
                color: theme.palette.text.primary,
              }}
            >
              Refunds & Cancelation
            </Typography>
            <Typography
              variant="h6"
              className="text-center pt-6"
              style={{ lineHeight: 1.5, color: theme.palette.text.primary }}
            >
              Flight Canceled! <br />
              Instant refunds available
            </Typography>
          </div>

          <div
            className="flex flex-col items-center justify-center w-full h-64 p-6 rounded-lg shadow-md"
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            {" "}
            <LocalHospital
              fontSize="large"
              className="mb-4"
              style={{
                color: theme.palette.text.primary,
              }}
            />
            <Typography
              variant="h4"
              className="text-center mb-2 font-bold"
              style={{
                color: theme.palette.text.primary,
              }}
            >
              Health Guidelines
            </Typography>
            <Typography
              variant="h6"
              className="text-center pt-6"
              style={{ lineHeight: 1.5, color: theme.palette.text.primary }}
            >
              Stay informed about travel restrictions <br />
              and health updates
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
