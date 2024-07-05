import React, { useState, useEffect } from "react";

const CurrentPosition = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
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
