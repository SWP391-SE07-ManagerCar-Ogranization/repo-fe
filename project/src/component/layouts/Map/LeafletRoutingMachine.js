import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = ({ startPoint, endPoint }) => {
  const map = useMap();
  let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [90, 90],
  });

  useEffect(() => {
    const addRoutingControl = async () => {
      if (startPoint && endPoint && map) {
        const marker1 = L.marker(startPoint, { icon: DefaultIcon }).addTo(map);

        const control = L.Routing.control({
          waypoints: [L.latLng(startPoint), L.latLng(endPoint)],
          lineOptions: {
            styles: [
              {
                color: "red",
                weight: 4,
                opacity: 0.7,
              },
            ],
          },
          routeWhileDragging: false,
          geocoder: L.Control.Geocoder.nominatim(),
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          showAlternatives: true,
        }).addTo(map);

        control.on("routesfound", function (e) {
          const route = e.routes[0];
          const { coordinates } = route;

          let index = 0;
          const updateMarkerPosition = () => {
            if (index < coordinates.length) {
              const { lat, lng } = coordinates[index];
              marker1.setLatLng([lat, lng]);
              index++;
              setTimeout(updateMarkerPosition, 100); // Adjust the timeout for speed control
            } else {
              marker1.setLatLng(endPoint); // Ensure the marker ends up at the final destination
            }
          };

          updateMarkerPosition();
        });

        return () => {
          // Only remove control if it has been added to the map
          if (map && control) {
            map.removeControl(control);
          }
          // Also remove marker1 if it exists
          if (map && marker1) {
            map.removeLayer(marker1);
          }
        };
      }
    };

    addRoutingControl();
  }, [startPoint, endPoint, map, DefaultIcon]);

  return null;
};

export default LeafletRoutingMachine;
