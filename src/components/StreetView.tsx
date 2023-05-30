import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Form_Table_Props } from "../types/Interfaces";
import Api from "services/Api";

export const StreetView: React.FC<Pick<Form_Table_Props, "locations">> = ({
  locations,
}) => {
  const [locationIndex, setLocationIndex] = useState(0);

  const [streetPosition, setStreetPosition] = useState({
    lat: parseFloat(locations[locationIndex].attributes.latitude),
    lng: parseFloat(locations[locationIndex].attributes.longitude),
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });

  const onLoad = useCallback(
    function callback() {
      new window.google.maps.StreetViewPanorama(
        document.getElementById("map") as HTMLElement,
        {
          position: streetPosition,
          linksControl: false,
          enableCloseButton: false,
          disableDefaultUI: true,
          zoomControl: false,
          clickToGo: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          addressControl: false,
        }
      );
    },
    [streetPosition]
  );

  useEffect(() => {
    if (isLoaded) {
      onLoad();
    }
  }, [isLoaded, onLoad, streetPosition]);

  useEffect(() => {
    setStreetPosition({
      lat: parseFloat(locations[locationIndex].attributes.latitude),
      lng: parseFloat(locations[locationIndex].attributes.longitude),
    });
  }, [locationIndex, locations]);

  const getNextLocation = () => {
    setLocationIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "800px", height: "600px" }}
          center={streetPosition}
          id="map"
          onLoad={onLoad}
        ></GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={getNextLocation}>Next Location</button>
    </div>
  );
};
