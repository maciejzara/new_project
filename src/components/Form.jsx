import React, { useRef } from "react";
import "./Form.style.css";

export const Form = () => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();

  const longitudeRef = useRef();
  const latitudeRef = useRef();
  const continentRef = useRef();
  const countryRef = useRef();

  const addLevels = async (e) => {
    e.preventDefault();
    const response = await fetch("http://0.0.0.0:13899/api/levels", {
      headers: {
        Authorization: `Bearer {${process.env.API_KEY}}`,
        "Content-Type": "application/json",
      },
      method: "POST",

      body: JSON.stringify({
        data: {
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          location: locationRef.current.value,
        },
      }),
    });
  };

  const addLocations = async (e) => {
    e.preventDefault();
    const response = await fetch("http://0.0.0.0:13899/api/locations", {
      headers: {
        Authorization: `Bearer {${process.env.API_KEY}}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        data: {
          longitude: longitudeRef.current.value,
          latitude: latitudeRef.current.value,
          continent: continentRef.current.value,
          country: countryRef.current.value,
        },
      }),
    });
  };

  return (
    <div className="columns">
      <div className="column">
        <form onSubmit={addLevels}>
          <h1 className="title is-2 is-spaced has-text-white mt-5">
            Levels Data
          </h1>

          <div className="field">
            <label htmlFor="name">Name</label>
            <div className="control">
              <input
                type="text"
                id="name"
                ref={nameRef}
                className="input is-primary is-medium"
                autoComplete="off"
              ></input>
            </div>
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <div className="control">
              <input
                id="description"
                ref={descriptionRef}
                className="input is-primary is-medium"
                autoComplete="off"
              ></input>
            </div>
          </div>

          <div className="field">
            <label htmlFor="location">Location</label>
            <div className="control">
              <input
                id="location"
                ref={locationRef}
                className="input is-primary is-medium"
                autoComplete="off"
              ></input>
            </div>
          </div>

          <div className="control">
            <button type="submit" className="button is-large is-primary">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="column">
        <form onSubmit={addLocations}>
          <h1 className="title is-2 is-spaced has-text-white mt-5">
            Location Data
          </h1>

          <div className="field">
            <label htmlFor="longitude">Longitude</label>
            <div className="control">
              <input
                id="longitude"
                ref={longitudeRef}
                className="input is-primary is-medium"
                autoComplete="off"
              ></input>
            </div>
          </div>

          <div className="field">
            <label htmlFor="latitude">Latitude</label>
            <div className="control">
              <input
                id="latitude"
                ref={latitudeRef}
                className="input is-primary is-medium"
                autoComplete="off"
              ></input>
            </div>
          </div>

          <div className="field">
            <label htmlFor="continent">Continent</label>
            <div className="control">
              <input
                id="continent"
                ref={continentRef}
                className="input is-primary is-medium"
                autoComplete="off"
              ></input>
            </div>
          </div>

          <div className="field">
            <label htmlFor="country">Country</label>
            <div className="control">
              <input
                id="country"
                ref={countryRef}
                className="input is-primary is-medium"
                autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-large is-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
