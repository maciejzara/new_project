import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { WorldMapProps } from "types/Interfaces";

export const WorldMap: React.FC<WorldMapProps> = ({
  markers,
  setMarkers,
  center,
  zoom,
}) => {
  const [containerStyle, setContainerStyle] = useState({
    width: "400px",
    height: "200px",
    borderRadius: "20px",
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
      setMarkers([newMarker]);
    }
  };

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          options={{
            zoomControl: true,
            scrollwheel: true,
            maxZoom: 14,
            minZoom: 2,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            keyboardShortcuts: false,
            draggableCursor: "default",
          }}
          onClick={placeMarkers}
          onMouseOver={() =>
            setContainerStyle({
              width: "600px",
              height: "400px",
              borderRadius: "20px",
            })
          }
          onMouseOut={() =>
            setContainerStyle({
              width: "400px",
              height: "200px",
              borderRadius: "20px",
            })
          }
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
