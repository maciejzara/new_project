import React, { useState } from "react";
import { WorldMap } from "./WorldMap";
import { StreetView } from "./StreetView";
import "./GameComponent.css";
import { MarkersTypes } from "types/Interfaces";
import { Form_Table_Props } from "../types/Interfaces";

export const GameComponent: React.FC<Pick<Form_Table_Props, "locations">> = ({
  locations,
}) => {
  const [markers, setMarkers] = useState<MarkersTypes[]>([]);

  return (
    <div className="container">
      <h1>GameComponent</h1>
      <div className="street">
        <StreetView
          // levels={levels} setLevels={setLevels}
          locations={locations}
        />
        <div className="world">
          <WorldMap markers={markers} setMarkers={setMarkers} />
        </div>
      </div>
      <div>Counter: {markers.length}</div>
      <button className="button">Send Guess</button>
    </div>
  );
};
