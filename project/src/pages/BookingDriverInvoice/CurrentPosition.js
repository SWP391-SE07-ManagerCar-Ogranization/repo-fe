import React, { useState, useEffect } from "react";
import { getCurrentLocation } from "../../service/PositionService";

const CurrentPosition = () => {
  const [location, setLocation] = useState({ lat: "", lon: "" });

  const showCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      setLocation({ lat: location[0], lon: location[1] });
      return location;
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    showCurrentLocation();
  }, []);

  return (
    <div>
      {location.lat && location.lon ? (
        <p>
          Current Location Coordinates: Latitude: {location.lat},{location.lon}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrentPosition;
