import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import api from "../services/api";

const InteractiveRating = ({ travelPlanId, rating }) => {
  const [value, setValue] = useState(rating); 
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();

  const handleRatingChange = (newValue) => {
    setValue(newValue);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  

  const handleSubmit = async () => {
    setSubmitted(false);
    try {
      const response = await api.patch(
        `/recommendation/travel-plans/${travelPlanId}/update-rating/`, 
        {
          rating: value,
        }
      );
      console.log("Response data:", response.data); 
      setSubmitted(true);
      setFeedback("");
    } catch (error) {
      console.log("Error updating rating: ", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-[85%] mt-6 mb-6 mx-auto p-6 rounded-3xl shadow-lg border"
      style={{
        borderColor: theme.palette.primary.main,
      }}
    >
      <h2 className="mb-4 text-2xl font-semibold">Rate Our Recommendation</h2>
      <Rating
        name="half-rating"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => handleRatingChange(newValue)}
        className="mb-4"
      />
      <TextField
        label="Your Feedback"
        multiline
        rows={4}
        value={feedback}
        onChange={handleFeedbackChange}
        variant="outlined"
        fullWidth
        className="mb-4"
        style={{ backgroundColor: theme.palette.background.default }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
          },
          gridColumn: "span 2",
        }}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          mt: 2,
          borderRadius: "18px",
        }}
      >
        <Typography variant="h6">Submit Feedback</Typography>
      </Button>
      {submitted && (
        <p className="mt-2 text-green-600">Thank you for your feedback!</p>
      )}
    </div>
  );
};

export default InteractiveRating;
