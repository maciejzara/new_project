import React from "react";
import { Form_Table_Props } from "../types/Interfaces";

export const Form: React.FC<Form_Table_Props> = ({
  levels,
  setLevels,
  locations,
  setLocations,
}) => {
  const handleLevelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target; // można zrobić destrukturyzację e.target
    setLevels((prevLevels) =>
      prevLevels.map((level) => ({
        ...level,
        attributes: {
          ...level.attributes,
          [e.target.name]: e.target.value,
        },
      }))
    );
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) => ({
        ...location,
        attributes: {
          ...location.attributes,
          [e.target.name]: e.target.value,
        },
      }))
    );
  };

  // Add rendering Table after adding record - same for Locations
  const addLevels = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const response = await fetch("https://strapi-km.herokuapp.com/api/levels", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        data: {
          name,
          description,
        },
      }),
    });
    const data = await response.json();
    const newData = data.data;
    setLevels((prevLevels) => [...prevLevels, newData]);
    e.target.reset();
  };

  const addLocations = async (e: any) => {
    e.preventDefault();
    const longitude = e.target.longitude.value;
    const latitude = e.target.latitude.value;
    const continent = e.target.continent.value;
    const country = e.target.country.value;
    const response = await fetch(
      "https://strapi-km.herokuapp.com/api/locations",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          data: {
            longitude,
            latitude,
            continent,
            country,
          },
        }),
      }
    );
    const data = await response.json();
    const newData = data.data;
    setLocations((prevLocations) => [...prevLocations, newData]);
    e.target.reset();
  };

  return (
    <>
      <div className="columns">
        <div className="column">
          <form onSubmit={addLevels}>
            <h1 className="title is-3 is-spaced has-text-white mt-1">Levels</h1>

            <div className="field">
              <label htmlFor="name" className="label has-text-white">
                Name
              </label>
              <div className="control">
                <input
                  type="text"
                  id="name"
                  onChange={handleLevelsChange}
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
              </div>
            </div>

            <div className="field">
              <label htmlFor="description" className="label has-text-white">
                Description
              </label>
              <div className="control">
                <input
                  id="description"
                  onChange={handleLevelsChange}
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
              </div>
            </div>

            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="column">
          <form onSubmit={addLocations}>
            <h1 className="title is-3 is-spaced has-text-white mt-1">
              Location
            </h1>

            <div className="field">
              <label htmlFor="longitude" className="label has-text-white">
                Longitude
              </label>
              <div className="control">
                <input
                  id="longitude"
                  onChange={handleLocationChange}
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
              </div>
            </div>

            <div className="field">
              <label htmlFor="latitude" className="label has-text-white">
                Latitude
              </label>
              <div className="control">
                <input
                  id="latitude"
                  onChange={handleLocationChange}
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
              </div>
            </div>

            <div className="field">
              <label htmlFor="continent" className="label has-text-white">
                Continent
              </label>
              <div className="control">
                <input
                  id="continent"
                  onChange={handleLocationChange}
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
              </div>
            </div>

            <div className="field">
              <label htmlFor="country" className="label has-text-white">
                Country
              </label>
              <div className="control">
                <input
                  id="country"
                  onChange={handleLocationChange}
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
