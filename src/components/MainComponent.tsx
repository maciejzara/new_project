import React from "react";
import { FormLevels } from "components/FormLevels";
import { FormLocations } from "components/FormLocations";
import { Table } from "components/Table";
import { Form_Table_Props } from "types/Interfaces";

export const MainComponent: React.FC<Form_Table_Props> = ({
  levels,
  setLevels,
  locations,
  setLocations,
}) => {
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
