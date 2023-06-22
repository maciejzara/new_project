import React, { useState } from "react";
import { WorldMap } from "./WorldMap";
import { StreetView } from "./StreetView";
import "./GameComponent.css";
import { MarkersTypes } from "types/Interfaces";
// import useGameContext from "context/useGameContext";

interface StreetViewPosition {
  lat: number;
  lng: number;
}

export const GameComponent: React.FC = () => {
  const [markers, setMarkers] = useState<MarkersTypes[]>([]);
  const [streetPositions, setStreetPositions] = useState<StreetViewPosition[]>(
    []
  );
  const [displayPosition, setDisplayPosition] = useState<StreetViewPosition>();

  const [center, setCenter] = useState({
    lat: 54.913793,
    lng: 9.7790408,
  });

  const [zoom, setZoom] = useState(2);

  // const { locations, assignedLevels } = useGameContext();

  const getNextLocation = () => {
    if (streetPositions.length > 0) {
      const currentIndex = streetPositions.findIndex(
        (position) => position === displayPosition
      );

      if (markers.length > 0) {
        markers.forEach((item) => {
          // Zaznaczona pozycja // const czy let
          let markedLat = item.lat;
          let markedLng = item.lng;

          // Aktualna pozycja
          const currentLat = displayPosition?.lat ?? 0;
          const currentLng = displayPosition?.lng ?? 0;

          // console.log(assignedLevels);
          const R = 6371e3; // metres
          const φ1 = (markedLat * Math.PI) / 180; // φ, λ in radians
          const φ2 = (currentLat * Math.PI) / 180;
          const Δφ = ((currentLat - markedLat) * Math.PI) / 180;
          const Δλ = ((currentLng - markedLng) * Math.PI) / 180;

          const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

          const d = R * c; // in metres

          const distance = d / 1000; // in kilimeters
          const roundedToTwo = Number(distance.toFixed(2));
          alert(`Distance: ${roundedToTwo} km`);
        });

        //
        //wyślij lat i lng do database

        const nextIndex = (currentIndex + 1) % streetPositions.length;

        setDisplayPosition(streetPositions[nextIndex]);

        setMarkers([]);
      } else {
        alert("No place on map has been chosen!");
      }
    }
  };

  return (
    <div className="container">
      <h1>GameComponent</h1>
      <div className="street">
        <StreetView
          displayPosition={displayPosition}
          setDisplayPosition={setDisplayPosition}
          streetPositions={streetPositions}
          setStreetPositions={setStreetPositions}
        />
        <div className="world">
          <WorldMap
            markers={markers}
            setMarkers={setMarkers}
            center={center}
            setCenter={setCenter}
            zoom={zoom}
          />
        </div>
      </div>
      <button className="button" onClick={getNextLocation}>
        Next Location
      </button>
    </div>
  );
};
