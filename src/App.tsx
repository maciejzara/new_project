import React, { useState } from "react";
import "./App.css";
import { MainComponent } from "components/MainComponent";
import { Routes, Route } from "react-router-dom";
import { GameComponent } from "components/GameComponent";
import { LevelsTypeObject, LocationsTypesObject } from "types/Interfaces";

const App: React.FC = () => {
  const [levels, setLevels] = useState<LevelsTypeObject[]>([]);
  const [locations, setLocations] = useState<LocationsTypesObject[]>([]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainComponent
              levels={levels}
              setLevels={setLevels}
              locations={locations}
              setLocations={setLocations}
            />
          }
        />
        <Route path="/map" element={<GameComponent locations={locations} />} />
      </Routes>
    </div>
  );
};

//location/1
export default App;
