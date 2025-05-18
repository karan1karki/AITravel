import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import DiningCard from "../components/DiningCard";
import InteractiveRating from "../components/InteractiveRating";
import NavBar from "../components/NavBar";
import api from "../services/api";

const RecommendationDetailsPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [travelPlan, setTravelPlan] = useState({});
  const [flight, setFlight] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [activities, setActivities] = useState([]);
  const [rating, setRating] = useState(0);

  const getTravelPlanDetails = async () => {
    try {
      const response = await api.get(`/recommendation/travel-plans/${id}/`);
      setTravelPlan(response.data);
      setFlight(response.data.flight);
      setRestaurants(response.data.restaurants);
      setActivities(response.data.activities);
      setRating(response.data.rating);
    } catch (error) {
      console.log("Error getting travel plan details: ", error);
    }
  };

  useEffect(() => {
    getTravelPlanDetails();
  }, [id]);

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isAM = hours < 12;

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    const period = isAM ? "AM" : "PM";

    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  return (
    <>
      <NavBar />
      <div
        className="flex flex-row items-center justify-center w-[85%] mt-6 mx-auto rounded-3xl shadow-lg border"
        style={{
          borderColor: theme.palette.primary.main,
        }}
      >
        <div className="flex-1 flex-col p-6 h-full">
          <div className="p-2">
            <Typography variant="h4">Flight Information</Typography>
          </div>
          <div className="p-2">
            <Typography>
              <span style={{ fontWeight: "bold" }}>Departure</span>:{" "}
              {travelPlan.origin_city} - {flight.departure?.slice(0, 10)} at{" "}
              {convertTimestamp(flight.departure) || "N/A"}
            </Typography>
          </div>
          <div className="p-2">
            <Typography>
              <span style={{ fontWeight: "bold" }}>Arrival</span>:{" "}
              {travelPlan.destination_city} - <span> </span>
              {flight.arrival?.slice(0, 10) || "N/A"} at{" "}
              {convertTimestamp(flight.arrival) || "N/A"}
            </Typography>
          </div>
          <div className="p-2">
            <Typography>
              <span style={{ fontWeight: "bold" }}>One Way</span>:{" "}
              {flight.one_way === false ? "No" : "Yes"}
            </Typography>
          </div>
          <div className="p-2">
            <Typography>
              <span style={{ fontWeight: "bold" }}>Price</span>: {flight.price}{" "}
              {flight.currency}
            </Typography>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end p-6 h-full">
          <Button
            variant="contained"
            sx={{
              borderRadius: "18px",
            }}
          >
            <Typography variant="h6">Book Flight</Typography>
          </Button>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center w-[85%] mt-6 mb-6 mx-auto rounded-3xl shadow-lg border"
        style={{
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            p: 3,
          }}
        >
          Dining Options
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={
            isNotMobileScreen ? "repeat(3, 1fr)" : "repeat(1, 1fr)"
          }
          gap="30px"
          sx={{
            m: 3,
          }}
        >
          {restaurants.map((restaurant) => (
            <DiningCard
              key={restaurant.id}
              restaurantImage={"/cities/paris.jpg"}
              restaurantName={restaurant?.name}
              restaurantAddress={restaurant?.address}
              restaurantWebsite={restaurant?.website}
              restaurantPhone={restaurant?.phone}
            />
          ))}
        </Box>
      </div>
      <div
        className="flex flex-col items-center justify-center w-[85%] mt-6 mb-6 mx-auto rounded-3xl shadow-lg border"
        style={{
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            p: 3,
          }}
        >
          Attractions and Experiences
        </Typography>
        <div className="w-full">
          <Box
            display="grid"
            gridTemplateColumns="repeat(1, 1fr)"
            gap="30px"
            sx={{
              m: 3,
            }}
          >
            {activities.map((activity, id) => (
              <ActivityCard
                key={id}
                activityName={activity.name}
                activityCategories={activity.categories}
                activityAddress={activity.address}
              />
            ))}
          </Box>
        </div>
      </div>

      <InteractiveRating
        travelPlanId={id}
        rating={rating}
      />
    </>
  );
};

export default RecommendationDetailsPage;
