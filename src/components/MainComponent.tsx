import React, { useState } from "react";
import { FormLevels } from "components/FormLevels";
import { FormLocations } from "components/FormLocations";
import { Table } from "components/Table";
import {
  LevelsTypeObject,
  LocationsTypesObject,
  Form_Table_Props,
} from "types/Interfaces";

// import { StreetView } from "./components/StreetView";
// działa ale bez API
// import { StreetViewPanorama } from "../src/components/StreetViewPanorama";

export const MainComponent: React.FC<Form_Table_Props> = ({
  levels,
  setLevels,
  locations,
  setLocations,
}) => {
  // const [levels, setLevels] = useState<LevelsTypeObject[]>([]);
  // const [locations, setLocations] = useState<LocationsTypesObject[]>([]);

  return (
    <>
      <div className="columns">
        <div className="column">
          <FormLevels levels={levels} setLevels={setLevels} />
        </div>
        <div className="column">
          <FormLocations
            levels={levels}
            setLevels={setLevels}
            locations={locations}
            setLocations={setLocations}
          />
        </div>
      </div>
      <Table
        levels={levels}
        setLevels={setLevels}
        locations={locations}
        setLocations={setLocations}
      />
    </>
  );
};
