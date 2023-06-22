import React from "react";
import "./App.css";
import { MainComponent } from "components/MainComponent";
import { Routes, Route } from "react-router-dom";
import { GameComponent } from "components/GameComponent";
import { GameProvider } from "context/GameContext";

const App: React.FC = () => {
  // const [levels, setLevels] = useState<LevelsTypeObject[]>([]);
  // const [locations, setLocations] = useState<LocationsTypesObject[]>([]);

  return (
    <div className="App">
      <GameProvider>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/map/:levelId" element={<GameComponent />} />
        </Routes>
      </GameProvider>
    </div>
  );
};

//location/1
export default App;
