import { useTheme } from "@mui/material";

const ActivityCard = ({
  activityName,
  activityCategories,
  activityAddress,
}) => {
  const theme = useTheme();
  function getUniqueValues(inputString) {
    const uniqueValues = [
      ...new Set(inputString.split(",").map((value) => value.trim())),
    ];
    const uniqueValuesString = uniqueValues.join(", ");
    return uniqueValuesString;
  }
  return (
    <div
      className="w-full rounded-lg shadow-md transition-transform transform hover:scale-105 p-4"
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <div className="mb-2">
        <h2
          className="text-xl font-bold "
          style={{
            color: theme.palette.text.primary,
          }}
        >
          {activityName}
        </h2>
      </div>

      <div className="mb-2">
        <span className="font-semibold">Categories:</span>
        <p
          style={{
            color: theme.palette.text.primary,
          }}
        >
          {getUniqueValues(activityCategories)}
        </p>
      </div>

      <div>
        <span className="font-semibold">Address:</span>
        <p
          style={{
            color: theme.palette.text.primary,
          }}
        >
          {activityAddress}
        </p>
      </div>

      <div className="mt-4">
        <button className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
