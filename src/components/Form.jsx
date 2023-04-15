import React from "react";
import "./Form.style.css";

export const Form = () => {
  const addLevels = async () => {
    const response = await fetch("http://0.0.0.0:22559/api/levels", {
      headers: {
        Authorization: `Bearer {${process.env.API_KEY}}`,
      },
      method: "POST",
      body: JSON.stringify(),
    });
  };

  const addLocations = async () => {
    const response = await fetch("http://0.0.0.0:22559/api/locations", {
      headers: { Authorization: `Bearer {${process.env.API_KEY}}` },
      method: "POST",
      body: JSON.stringify(),
    });
  };

  return (
    <>
      <form onSubmit={addLevels}>
        <label htmlFor="name">Name</label>
        <input id="name"></input>
        <label htmlFor="description">Description</label>
        <input id="description"></input>
        <label htmlFor="location">Location</label>
        <input id="location" onSubmit={addLocations}></input>
      </form>

      <form onSubmit={addLocations}>
        <label htmlFor="longitude">Longitude</label>
        <input id="longitude"></input>
        <label htmlFor="latitude">Latitude</label>
        <input id="latitude" onSubmit={addLocations}></input>
        <label htmlFor="continent">Continent</label>
        <input id="continent" onSubmit={addLocations}></input>
        <label htmlFor="country">Country</label>
        <input id="country" onSubmit={addLocations}></input>
      </form>
    </>
  );
};
