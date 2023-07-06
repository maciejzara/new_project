import React, { useEffect, useState } from "react";
import { WorldMap } from "./WorldMap";
import { StreetView } from "./StreetView";
import "./GameComponent.css";
import { LocationsTypesObject, MarkersTypes } from "types/Interfaces";
import { useParams } from "react-router-dom";
import useGameContext from "context/useGameContext";

interface StreetViewPosition {
  lat: number;
  lng: number;
}

export const GameComponent: React.FC = () => {
  const { assignedLevels, setGameData } = useGameContext();
  const { levelId } = useParams();

  const [markers, setMarkers] = useState<MarkersTypes[]>([]);
  const [streetPositions, setStreetPositions] = useState<StreetViewPosition[]>(
    []
  );
  const [displayPosition, setDisplayPosition] = useState<StreetViewPosition>();
  const [center, setCenter] = useState({
    lat: 54.913793,
    lng: 9.7790408,
  });
  const [zoom] = useState(2);

  useEffect(() => {
    if (levelId)
      setGameData((prevData) => ({ ...prevData, levelId: Number(levelId) }));
  }, []);

  const nextLocation = () => {
    if (streetPositions.length > 0) {
      const currentIndex = streetPositions.findIndex(
        (position) => position === displayPosition
      );

      if (markers.length > 0) {
        const marker = markers[0];
        // Zaznaczona pozycja // const czy let
        let markedLat = marker.lat;
        let markedLng = marker.lng;

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
        const distanceRounded = Number(distance.toFixed(2));
        const points = Number(1 / distanceRounded);
        const multipliedPoints = Number((points * 100000).toFixed(0));
        alert(`Distance: ${distanceRounded} km, points: ${multipliedPoints}`);
        const score = multipliedPoints;

        const nextIndex = (currentIndex + 1) % streetPositions.length;
        setDisplayPosition(streetPositions[nextIndex]);

        // STWORZ records w localStorage
        // userName - już powinien być w stanie
        // level.id mam - levelId
        // location.id - currentLocation.id
        // score - jest na dole w km

        const locationsAssigned = assignedLevels[Number(levelId)];
        const cLocation = locationsAssigned?.find(
          (obj) =>
            Number(obj.attributes.latitude) === displayPosition?.lat &&
            Number(obj.attributes.longitude) === displayPosition.lng
        );

        console.log("X:", cLocation?.id, score);
        if (cLocation?.id && score)
          setGameData((prevData) => ({
            ...prevData,
            locationScores: prevData.locationScores.set(cLocation?.id, score),
          }));

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
      <button className="button" onClick={nextLocation}>
        Next Location
      </button>
    </div>
  );
};
