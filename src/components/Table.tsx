import React, { useEffect, useState } from "react";
import { Form_Table_Props } from "../types/Interfaces";
import Select, { MultiValue } from "react-select";

export const Table: React.FC<Form_Table_Props> = ({
  levels,
  setLevels,
  locations,
  setLocations,
}) => {
  const [selectedLevels, setSelectedLevels] = useState<
    Record<number, number[]>
  >([]);
  //GET Levels
  useEffect(() => {
    const getLevels = async () => {
      const response = await fetch(
        "https://strapi-km.herokuapp.com/api/levels",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          method: "GET",
        }
      );
      const data = await response.json();
      setLevels(data.data);
      console.log("rerender Levels");
    };
    getLevels();
  }, []);

  //GET Locations
  useEffect(() => {
    const getLocations = async () => {
      const response = await fetch(
        "https://strapi-km.herokuapp.com/api/locations?populate=*",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          method: "GET",
        }
      );

      const data = await response.json();
      setLocations(data.data);
      console.log("rerender Locations", data.data);
    };
    getLocations();
  }, []);

  // DELETE Level
  const deleteLevel = (id: number) => {
    fetch(`https://strapi-km.herokuapp.com/api/levels/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    setLevels(levels.filter((level) => level.id !== id));
  };

  // DELETE Locations
  const deleteLocation = (id: number) => {
    fetch(`https://strapi-km.herokuapp.com/api/locations/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    setLocations(locations.filter((location) => location.id !== id));
  };

  //UPDATE Location
  const updateLocation = (id: number) => {
    const locationById = locations.find((location) => location.id === id);
    const location = {
      ...locationById?.attributes,
      levels: selectedLevels[id],
    };
    console.log({
      Location: locationById,
      LocationEdited: location,
    });

    fetch(`https://strapi-km.herokuapp.com/api/locations/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ data: location }),
    });
  };

  const assignLevels = (id: number) => {
    console.info("SelectedLevels:", selectedLevels);
    updateLocation(id);
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
            {Array.from(levels).map((level) => (
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
            {Array.from(locations).map((location) => (
              <tr key={location.id}>
                <td>{location.attributes.name}</td>
                <td>{location.attributes.longitude}</td>
                <td>{location.attributes.latitude}</td>
                <td>{location.attributes.continent}</td>
                <td>{location.attributes.country}</td>
                <td>
                  <Select
                    defaultValue={location.attributes.levels.data.map(
                      (level) => ({
                        value: level.id,
                        label: level.attributes.name,
                      })
                    )}
                    options={levels.map((level) => ({
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
                    }}
                  />
                </td>
                <td>
                  <button
                    className="button"
                    onClick={() => assignLevels(location.id)}
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
