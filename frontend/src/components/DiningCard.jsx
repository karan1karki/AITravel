import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";

const DiningCard = ({ restaurantName, restaurantImage, restaurantPhone, restaurantAddress, restaurantWebsite }) => {
  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        borderRadius: "16px", 
        boxShadow: 3, 
        transition: "transform 0.2s",
        '&:hover': {
          transform: 'scale(1.05)', 
        }
      }}
    >
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="160"
          image={restaurantImage}
          alt={`${restaurantName} restaurant`}
          sx={{
            p: 2,
            borderRadius: "16px",
            objectFit: "cover",
          }}
        /> */}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            color="text.primary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {restaurantName}
          </Typography>

          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold", mt: 1 }}>
            Phone:
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {restaurantPhone}
          </Typography>

          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }}>
            Address:
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {restaurantAddress}
          </Typography>

          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }}>
            Website:
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            color="text.secondary"
          >
            {restaurantWebsite}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div style={{ padding: "16px" }}>
        <Button
          variant="contained"
          size="large"
          sx={{ 
            width: "100%", 
            borderRadius: "18px", 
            backgroundColor: "#6200ea", 
            '&:hover': {
              backgroundColor: "#3700b3",
            },
          }}
        >
          Book Restaurant
        </Button>
      </div>
    </Card>
  );
};

export default DiningCard;
