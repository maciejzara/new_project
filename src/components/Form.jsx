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
    const data = await response.json();

    console.log(data);
  };

  const addLocations = async (e) => {
    e.preventDefault();
    const response = await fetch("http://0.0.0.0:13899/api/locations", {
      headers: {
        Authorization: `Bearer {${process.env.API_KEY}}`,
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
    <>
      <form onSubmit={addLevels}>
        <h1>Levels Data</h1>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef}></input>
        <label htmlFor="description">Description</label>
        <input id="description" ref={descriptionRef}></input>
        <label htmlFor="location">Location</label>
        <input id="location" ref={locationRef}></input>
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={addLocations}>
        <h1>Location Data</h1>
        <label htmlFor="longitude">Longitude</label>
        <input id="longitude" ref={longitudeRef}></input>
        <label htmlFor="latitude">Latitude</label>
        <input id="latitude" ref={latitudeRef}></input>
        <label htmlFor="continent">Continent</label>
        <input id="continent" ref={continentRef}></input>
        <label htmlFor="country">Country</label>
        <input id="country" ref={countryRef}></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
