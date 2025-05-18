import { Typography } from "@mui/material";

const MainRecommendationCard = ({ imagePath, cityName }) => {
  return (
    <div
      className="relative w-full rounded-lg mt-6 mb-6 max-w-xs transition duration-300 ease-in-out hover:scale-110"
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "250px",
        width: "200px",
        borderRadius: "12px", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
        overflow: "hidden", 
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h6"
          style={{
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
          }}
        >
          {cityName}
        </Typography>
      </div>
    </div>
  );
};

export default MainRecommendationCard;
