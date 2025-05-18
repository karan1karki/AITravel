import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

const RecommendationCard = ({ cityName, userRating, labels, onClick }) => {
  const [rating, setRating] = useState(userRating);
  const [hover, setHover] = useState(-1);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg shadow-lg p-6"
      style={{
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Avatar
        alt={cityName}
        src={`/cities/${cityName.toLowerCase()}.jpg`}
        sx={{
          height: "100px",
          width: "100px",
          m: 2,
        }}
      />
      <Typography
        variant="h3"
        sx={{
          m: 1,
        }}
      >
        {cityName}
      </Typography>

      <Rating
        value={rating}
        precision={0.5}
        readOnly 
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={
          <StarIcon
            style={{ opacity: 0.55 }}
            fontSize="inherit"
          />
        }
      />
      {rating !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
      )}
    </div>
  );
};
export default RecommendationCard;
