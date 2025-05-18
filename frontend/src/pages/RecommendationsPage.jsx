import { yupResolver } from "@hookform/resolvers/yup";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import NavBar from "../components/NavBar";
import RecommendationCard from "../components/RecommendationCard";
import data from "../data/destinations.json";
import api from "../services/api";
import { setIsGenerating } from "../store/state";

const schema = yup
  .object({
    origin: yup.string().required("Origin is required"),
    destination: yup.string().required("Destination is required"),
    budget: yup
      .number()
      .typeError("Budget must be a valid number")
      .positive("Budget must be a positive number")
      .required("Budget is required"),

    adults: yup
      .number()
      .typeError("Adults must be a valid number")
      .positive("Adults must be a positive number")
      .integer("Adults must be an integer")
      .required("Adults is required"),
    criteria: yup.string().required("Preferences are required"),
  })
  .required();

const RecommendationsPage = () => {
  const theme = useTheme();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const cities = data.map((destination) => destination.title);
  const navigate = useNavigate();
  const [generate, setGenerate] = useState(
    useSelector((state) => state.setIsGenerating)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [travelPlans, setTravelPlans] = useState(null);

  const onSubmit = async (data) => {
    try {
      setGenerate(dispatch(setIsGenerating()));
      const response = await api.post("/recommendation/generate-plan/", {
        origin: data.origin,
        destination: data.destination,
        adults: data.adults,
        budget: data.budget,
        departure: departureDate,
        arrival: arrivalDate,
        criteria: data.criteria,
      });
      console.log("travel Plans : ", response.data);
    } catch (error) {
      console.log("error sending user preferences ", error);
    } finally {
      setGenerate(dispatch(setIsGenerating()));
      get_travel_plans();
    }
  };

  const get_travel_plans = async () => {
    try {
      const response = await api.get("/recommendation/travel-plans/");
      setTravelPlans(response.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    get_travel_plans();
  }, []);

  const [label, setLabel] = useState("");

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const labelStrings = Object.entries(labels).map(([key, value]) => value);

  return (
    <>
      <NavBar />
      <div
        className="flex flex-col items-center justify-center mt-6 mb-10 p-6 drop-shadow-lg rounded-lg w-[85%] mx-auto"
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h2"
          style={{
            color: theme.palette.text.primary,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Discover your travel options
        </Typography>
        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
          }}
        >
          Select your preferences to get personalized recommendations
        </Typography>
        <div className="flex flex-col items-center justify-center mt-6 mb-6 w-[75%] rounded-lg shadow-lg border">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mt: 3,
              textAlign: "center",
            }}
          >
            Your Personalized Plan
          </Typography>
          <form
            className="w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box
              display="grid"
              gridTemplateColumns="repeat(2,1fr)"
              gap="30px"
              sx={{
                mt: 3,
                mb: 3,
                width: "100%",
                p: 3,
              }}
            >
              <Autocomplete
                freeSolo
                disableClearable
                options={cities}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: isNotMobileScreen ? null : "span 2",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("origin")}
                    error={!!errors.origin}
                    helperText={errors.origin?.message}
                    label="Origin"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        type: "search",
                      },
                    }}
                  />
                )}
              />
              <Autocomplete
                freeSolo
                disableClearable
                options={cities}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: isNotMobileScreen ? null : "span 2",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("destination")}
                    error={!!errors.destination}
                    helperText={errors.destination?.message}
                    label="Destination"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        type: "search",
                      },
                    }}
                  />
                )}
              />
              <TextField
                {...register("adults")}
                error={!!errors.adults}
                helperText={errors.adults?.message}
                label="Adults"
                type="number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: !isNotMobileScreen && "span 2",
                }}
              />
              <TextField
                {...register("budget")}
                error={!!errors.budget}
                helperText={errors.budget?.message}
                label="Budget"
                type="number"
                slotProps={{
                  input: {
                    startAdornment: (
                      <AttachMoneyIcon position="start">$</AttachMoneyIcon>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: !isNotMobileScreen && "span 2",
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                    },
                    gridColumn: !isNotMobileScreen && "span 2",
                    width: "100%",
                  }}
                >
                  <DatePicker
                    label="Departure Date"
                    sx={{
                      width: "100%",
                    }}
                    disablePast
                    onChange={(newValue) => {
                      setDepartureDate(
                        `${newValue.year()}-${
                          newValue.month() + 1 >= 10
                            ? newValue.month() + 1
                            : "0" + (newValue.month() + 1)
                        }-${
                          newValue.date() >= 10
                            ? newValue.date()
                            : "0" + newValue.date()
                        }`
                      );
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                    },
                    gridColumn: !isNotMobileScreen && "span 2",
                    width: "100%",
                  }}
                >
                  <DatePicker
                    label="Arrival Date"
                    onChange={(newValue) => {
                      setArrivalDate(
                        `${newValue.year()}-${
                          newValue.month() + 1 >= 10
                            ? newValue.month() + 1
                            : "0" + (newValue.month() + 1)
                        }-${
                          newValue.date() >= 10
                            ? newValue.date()
                            : "0" + newValue.date()
                        }`
                      );
                    }}
                    sx={{
                      width: "100%",
                    }}
                    disablePast
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                {...register("criteria")}
                error={!!errors.criteria}
                helperText={errors.criteria?.message}
                placeholder="Share your travel preferences for flights, dining, activities, and accommodations to help us create the perfect plan tailored just for you!"
                multiline
                fullWidth
                rows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  gridColumn: "span 2",
                }}
              />{" "}
              <Button
                variant="contained"
                sx={{
                  borderRadius: "18px",
                  gridColumn: "span 2",
                }}
                type="submit"
              >
                <Typography>Generate My plan</Typography>
              </Button>
            </Box>
          </form>
        </div>
      </div>
      <div
        className="flex flex-col  mt-6 mb-10 p-6 drop-shadow-lg rounded-lg w-[85%] mx-auto border"
        style={{
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.primary.main,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Your Recommendations
        </Typography>
        <div className="w-full px-2 mb-3 flex justify-between items-center">
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
            }}
          >
            Showing {travelPlans && travelPlans.length} results
          </Typography>

          <div className="flex items-center">
            <FormControl
              sx={{
                width: isNotMobileScreen ? 180 : 120,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                },
              }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Sort By</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={label}
                label="Sort By"
                onChange={handleChange}
              >
                {labelStrings.map((label, id) => (
                  <MenuItem
                    key={id}
                    value={label}
                  >
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {generate && (
          <>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 2,
              }}
            >
              Please wait while you plan is being generated
            </Typography>
            <LinearProgress color="secondary" />
          </>
        )}
        <Box
          display="grid"
          gridTemplateColumns={
            isNotMobileScreen ? "repeat(3,1fr)" : "repeat(1,1fr)"
          }
          gap="30px"
        >
          {travelPlans && travelPlans.length > 0 ? (
            travelPlans.map((travelPlan, id) => (
              <RecommendationCard
                key={id}
                cityName={travelPlan.destination_city}
                userRating={travelPlan.rating}
                labels={labels}
                onClick={() => navigate(`/recommendations/${travelPlan.id}`)}
              />
            ))
          ) : (
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              You don t have any recommendations right now.
            </Typography>
          )}
        </Box>
      </div>
    </>
  );
};
export default RecommendationsPage;
