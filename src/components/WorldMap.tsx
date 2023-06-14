import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { WorldMapProps } from "types/Interfaces";

export const WorldMap: React.FC<WorldMapProps> = ({ markers, setMarkers }) => {
  const [mapCenter, setMapCenter] = useState({
    lat: 54.913793,
    lng: 9.7790408,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });

  const placeMarkers = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newMarker = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setMarkers([...markers, newMarker]);
      setMapCenter(newMarker);
      console.log(markers);
    }
  };

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "400px", height: "200px" }}
          center={mapCenter}
          zoom={2}
          options={{
            zoomControl: true,
            scrollwheel: true,
            maxZoom: 14,
            minZoom: 2,
          }}
          onClick={placeMarkers}
        >
          {markers.map((marker: any, index: number) => (
            <MarkerF
              key={index}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              draggable={true}
            />
          ))}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
