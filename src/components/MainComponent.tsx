import React from "react";
import { FormLevels } from "components/FormLevels";
import { FormLocations } from "components/FormLocations";
import { Table } from "components/Table";

export const MainComponent: React.FC = () => {
  return (
    <>
      <div className="columns">
        <div className="column">
          <FormLevels />
        </div>
        <div className="column">
          <FormLocations />
        </div>
      </div>
      <Table />
    </>
  );
};
