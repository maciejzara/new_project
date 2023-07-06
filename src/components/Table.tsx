import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import Api from "services/Api";
import { Link, useParams } from "react-router-dom";
import useGameContext from "context/useGameContext";

export const Table: React.FC = () => {
  const [selectedLevels, setSelectedLevels] = useState<
    Record<number, number[]>
  >([]);
  const [changedLocations, setChangedLocations] = useState<number[]>([]);

  const { levels, setLevels, locations, setLocations } = useGameContext();

  // DELETE Level
  const deleteLevel = async (id: number) => {
    await Api.instance().AxiosDeleteLevel(id);
    setLevels(levels.filter((level) => level.id !== id));
  };

  // DELETE Locations
  const deleteLocation = async (id: number) => {
    await Api.instance().AxiosDeleteLocation(id);
    setLocations(locations.filter((location) => location.id !== id));
  };

  //UPDATE Location
  const updateLocation = (id: number) => {
    const locationById = locations.find((location) => location.id === id);

    if (!locationById) return;
    const location = {
      ...locationById.attributes,
      levels: selectedLevels[id],
    };

    Api.instance().AxiosUpdateLocation(id, location);
  };

  return (
    <div>
      <div>
        <table className="table-container is-size-6 table is-bordered">
          <thead>
            <tr>
              <th>Level Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((level) => (
              <tr key={level.id}>
                <td>{level.attributes.name}</td>
                <td>{level.attributes.description}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => deleteLevel(level.id)}
                  >
                    Delete
                  </button>

                  <Link to={`/map/${level.id}`} className="button">
                    Play
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="column">
        <table className="table-container is-size-6 table is-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Continent</th>
              <th>Country</th>
              <th>Levels Name to Assign</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td>{location.attributes.name}</td>
                <td>{location.attributes.longitude}</td>
                <td>{location.attributes.latitude}</td>
                <td>{location.attributes.continent}</td>
                <td>{location.attributes.country}</td>
                <td>
                  <Select
                    defaultValue={location.attributes.levels?.data?.map(
                      (level) => ({
                        value: level.id,
                        label: level.attributes.name,
                      })
                    )}
                    options={levels?.map((level) => ({
                      value: level.id,
                      label: level.attributes.name,
                    }))}
                    isMulti
                    onChange={(
                      newValue: MultiValue<{ value: number; label: string }>
                    ) => {
                      setSelectedLevels({
                        ...selectedLevels,
                        [location.id]: newValue.map((v) => v.value),
                      });
                      setChangedLocations([...changedLocations, location.id]);
                    }}
                  />
                </td>
                <td>
                  <button
                    className={
                      changedLocations.includes(location.id)
                        ? "button has-background-warning"
                        : "button"
                    }
                    onClick={() => {
                      updateLocation(location.id);
                      setChangedLocations(
                        changedLocations.filter((id) => id !== location.id)
                      );
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="button"
                    onClick={() => deleteLocation(location.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
