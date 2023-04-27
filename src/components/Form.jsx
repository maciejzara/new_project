import React from "react";

export const Form = ({
  levels,
  setLevels,
  setName,
  setDescription,
  setLongitude,
  setLatitude,
  setContinent,
  setCountry,
  locations,
  setLocations,
}) => {
  // Add rendering Table after adding record - same for Locations
  const addLevels = async (e) => {
    e.preventDefault();
    const response = await fetch("https://strapi-km.herokuapp.com/api/levels", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        data: {
          name: e.target.name.value,
          description: e.target.description.value,
        },
      }),
    });
    const data = await response.json();
    const newData = data.data;
    setLevels([...levels, newData]);
    e.target.reset();
  };

  const addLocations = async (e) => {
    e.preventDefault();
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
            longitude: locations.longitude,
            latitude: locations.latitude,
            continent: locations.continent,
            country: locations.country,
          },
        }),
      }
    );
    const data = await response.json();
    const newData = data.data;
    setLocations([...locations, newData]);
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
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
                  onChange={(e) => setLongitude(e.target.value)}
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
                  onChange={(e) => setLatitude(e.target.value)}
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
                  onChange={(e) => setContinent(e.target.value)}
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
                  onChange={(e) => setCountry(e.target.value)}
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
