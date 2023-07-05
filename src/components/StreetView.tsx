import React, { useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import useGameContext from "context/useGameContext";
import { useParams } from "react-router-dom";

interface StreetViewProps {
  displayPosition: StreetViewPosition | undefined;
  setDisplayPosition: React.Dispatch<
    React.SetStateAction<StreetViewPosition | undefined>
  >;
  streetPositions: StreetViewPosition[];
  setStreetPositions: React.Dispatch<
    React.SetStateAction<StreetViewPosition[]>
  >;
}

interface StreetViewPosition {
  lat: number;
  lng: number;
}

export const StreetView: React.FC<StreetViewProps> = ({
  displayPosition,
  setDisplayPosition,
  streetPositions,
  setStreetPositions,
}) => {
  const { assignedLevels } = useGameContext();

  const { levelId } = useParams();

  useEffect(() => {
    const newLevelId = levelId ? +levelId : 0;
    const positions = assignedLevels[newLevelId]; // undefined
    const latLngPositions = positions.map((position) => ({
      lat: parseFloat(position.attributes.latitude),
      lng: parseFloat(position.attributes.longitude),
    }));

    setStreetPositions(latLngPositions);
  }, []);

  useEffect(() => {
    if (streetPositions.length > 0) {
      setDisplayPosition(streetPositions[0]);
    }
  }, [streetPositions, setDisplayPosition]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });

  const onLoad = useCallback(
    function callback() {
      new window.google.maps.StreetViewPanorama(
        document.getElementById("map") as HTMLElement,
        {
          position: displayPosition,
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
    [displayPosition]
  );

  useEffect(() => {
    if (isLoaded) {
      onLoad();
    }
  }, [isLoaded, onLoad]);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "800px", height: "600px" }}
          center={displayPosition}
          id="map"
          onLoad={onLoad}
        ></GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
