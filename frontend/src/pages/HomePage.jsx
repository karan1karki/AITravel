import {
  Box,
  Button,
  InputBase,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DestinationCard from "../components/DestinationCard";
import data from "../data/destinations.json";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [searchTerm, setSearchTerm] = useState("");
  const [destinationsResult, setDestinationsResult] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredDestinations = data.filter((destination) =>
      destination.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDestinationsResult(filteredDestinations);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center w-[85%] mx-auto mt-10">
        <div className="w-[75%] mb-4">
          <InputBase
            placeholder="Search for a destination..."
            className="w-full p-2 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="mt-6">
          <Box
            display="grid"
            gridTemplateColumns={
              isNotMobileScreen ? "repeat(3, 1fr)" : "repeat(1, 1fr)"
            }
            gap="30px"
          >
            {destinationsResult.slice(0, 3).map((destination, id) => (
              <DestinationCard
                key={id}
                title={destination.title}
                description={destination.description}
              />
            ))}
          </Box>
        </div>
        <div className="mt-10 text-center">
          <Typography
            variant="h2"
            className="font-bold text-3xl md:text-4xl text-purple-700"
          >
            Get Personalized Travel Recommendations
          </Typography>
        </div>
        <div className="mt-8 text-center">
          <Typography
            variant="h3"
            className="font-semibold text-xl md:text-2xl text-gray-600"
          >
            Tell us your preferences and we will recommend the best plan for you
          </Typography>
        </div>
        <div className="mt-6 mb-10">
          <Button
            variant="contained"
            sx={{
              borderRadius: "18px",
            }}
            onClick={() => navigate("/recommendations")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
