import React, { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import { LevelsTypeObject, LocationsTypesObject } from "./types/Interfaces";
import { Game } from "../src/components/Game";

const App: React.FC = () => {
  const [levels, setLevels] = useState<LevelsTypeObject[]>([]);

  const [locations, setLocations] = useState<LocationsTypesObject[]>([]);

  return (
    <div className="App">
      <header className="App-header">
        <Form
          levels={levels}
          setLevels={setLevels}
          locations={locations}
          setLocations={setLocations}
        />
        <Table
          levels={levels}
          setLevels={setLevels}
          locations={locations}
          setLocations={setLocations}
        />
        <Game />
      </header>
    </div>
  );
};

export default App;
