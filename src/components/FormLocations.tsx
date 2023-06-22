import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import Api from "services/Api";
import useGameContext from "context/useGameContext";

export const FormLocations: React.FC = () => {
  const { levels, locations, setLocations } = useGameContext();

  const [locationLevelIds, setLocationLevelIds] = useState<number[]>([]);

  const [isLongitude, setIsLongitude] = useState("");
  const [isLatitide, setIsLatitude] = useState("");

  const [selectOptions, setSelectOptions] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const options = levels.map((level) => ({
      value: level.id,
      label: level?.attributes?.name,
    }));
    setSelectOptions(options);
  }, [levels]);

  const isValidLongitude = (longitude: string) => {
    const parsedLongitude = parseFloat(longitude);
    return (
      !isNaN(parsedLongitude) &&
      parsedLongitude >= -180 &&
      parsedLongitude <= 180
    );
  };

  const isValidLatitude = (latitude: string) => {
    const parsedLatitude = parseFloat(latitude);
    return (
      !isNaN(parsedLatitude) && parsedLatitude >= -90 && parsedLatitude <= 90
    );
  };

  const handleLongitudeChange = (e: any) => {
    const latitude = e.target.value;
    if (!isValidLongitude(latitude)) {
      setIsLongitude("Please enter a valid longitude (between -180 and 180).");
    } else {
      setIsLongitude("");
      return;
    }
  };

  const handleLatitudeChange = (e: any) => {
    const latitude = e.target.value;
    if (!isValidLatitude(latitude)) {
      setIsLatitude("Please enter a valid latitude (between -90 and 90).");
    } else {
      setIsLatitude("");
      return;
    }
  };

  const addLocations = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const latitude = e.target.latitude.value;
    const longitude = e.target.longitude.value;
    const continent = e.target.continent.value;
    const country = e.target.country.value;

    if (!isValidLongitude(longitude)) {
      setIsLongitude("This field is required");
      return;
    }

    if (!isValidLatitude(latitude)) {
      setIsLatitude("This field is required");
      return;
    }

    // AXIOS
    const response = await Api.instance().AxiosAddLocation(
      name,
      latitude,
      longitude,
      continent,
      country,
      locationLevelIds
    );
    setLocations([...locations, response.data.data]);
    setLocationLevelIds([]);
    e.target.reset();
  };

  return (
    <>
      <div className="columns">
        <div className="column">
          <form onSubmit={addLocations}>
            <h1 className="title is-3 is-spaced has-text-white mt-1">
              Location
            </h1>

            <div className="field">
              <label htmlFor="name" className="label has-text-white">
                Name
              </label>
              <div className="control">
                <input
                  id="name"
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
                  onChange={handleLatitudeChange}
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>

                {isLatitide && <>{isLatitide}</>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="longitude" className="label has-text-white">
                Longitude
              </label>
              <div className="control">
                <input
                  id="longitude"
                  onChange={handleLongitudeChange}
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
                {isLongitude && <>{isLongitude}</>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="continent" className="label has-text-white">
                Continent
              </label>
              <div className="control">
                <input
                  id="continent"
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
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
              </div>
            </div>

            <div className="field">
              <label htmlFor="country" className="label has-text-white">
                Levels
              </label>
              <div className="control">
                <Select
                  className=" is-primary is-small has-text-black"
                  options={selectOptions}
                  isMulti
                  value={selectOptions.filter(
                    (option: { label: string; value: number }) =>
                      locationLevelIds.includes(option.value)
                  )}
                  onChange={(
                    newValue: MultiValue<{ value: number; label: string }>
                  ) => {
                    setLocationLevelIds(newValue.map((v) => v.value));
                  }}
                />
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
