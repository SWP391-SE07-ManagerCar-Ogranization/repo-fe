import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

function MapComponent() {
    const map = useMap();
    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider: provider,
            style: 'bar',
            showMarker: true,
            showPopup: false,
            marker: {
                icon: new L.Icon.Default(),
                draggable: false,
            },
            popupFormat: ({ query, result }) => result.label,
            maxMarkers: 1,
            retainZoomLevel: false,
            animateZoom: true,
            autoClose: true,
            searchLabel: 'Enter address',
            keepResult: true,
        });

        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map]);

    return null;
}

function Bookingcarpool() {
    const [position, setPosition] = useState([10.762622, 106.660172]); // Giả sử đây là vị trí ban đầu của bản đồ

    return (
        <div className="map-container" style={{ height: '90vh', width: '100%' }}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapComponent />
            </MapContainer>
        </div>
    );
}

export default Bookingcarpool;