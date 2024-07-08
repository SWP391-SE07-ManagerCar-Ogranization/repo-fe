import React, { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const LeafletGeocoder = ({ setStartPoint, setEndPoint }) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        const latlng = e.geocode.center;
        const isStart = document.activeElement.id === "start-input";
        if (isStart) {
          setStartPoint(latlng);
        } else {
          setEndPoint(latlng);
        }
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, [map, setStartPoint, setEndPoint]);

  return null;
};

export default LeafletGeocoder;
