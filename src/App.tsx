import React, { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";

function App() {
  const [levels, setLevels] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [locations, setLocations] = useState([]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [contitnet, setContinent] = useState("");
  const [country, setCountry] = useState("");

  // Która opcja jest lepsza ? Czy może useRef?
  // const [levels, setLevels] = useState({name:"", description: ""});
  // const [locations, setLocations] = useState({longitude: "", latitude: "", continent: "", country: ""});

  return (
    <div className="App">
      <header className="App-header">
        <Form
          levels={levels}
          setLevels={setLevels}
          setName={setName}
          setDescription={setDescription}
          setLongitude={setLongitude}
          setLatitude={setLatitude}
          setContinent={setContinent}
          setCountry={setCountry}
          locations={locations}
          setLocations={setLocations}
        />
        <Table
          levels={levels}
          setLevels={setLevels}
          locations={locations}
          setLocations={setLocations}
        />
      </header>
    </div>
  );
}

export default App;
