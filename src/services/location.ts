import { AxiosInstance } from "axios";

const submodule = (client: AxiosInstance) => {
  return {
    // GET Locations
    AxiosGetLocations: () => client.get("/locations?populate=*"),

    // POST Location
    // AxiosAddLocation: () => client.post<LocationsObjectType>('/locations', {
    // data: {
    // name,
    // latitude,
    // longitude,
    // continent,
    // country
    // }
    // })
  };
};

export default submodule;
