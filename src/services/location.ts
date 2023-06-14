import { AxiosInstance } from "axios";
import { LocationsTypes } from "types/Interfaces";

const submodule = (client: AxiosInstance) => {
  return {
    // GET Locations
    AxiosGetLocations: () => client.get("/locations?populate=*"),

    // DELETE Location
    AxiosDeleteLocation: (id: number) => client.delete(`/locations/${id}`),

    // POST Location
    AxiosAddLocation: (
      name: string,
      latitude: number,
      longitude: number,
      continent: string,
      country: string,
      locationLevelIds: number[]
    ) =>
      client.post<any>("/locations?populate=*", {
        data: {
          name,
          latitude,
          longitude,
          continent,
          country,
          levels: locationLevelIds,
        },
      }),

    // PUT Location
    AxiosUpdateLocation: (
      id: number,
      location: Omit<LocationsTypes, "levels"> & { levels: number[] }
    ) =>
      client.put(`/locations/${id}`, {
        data: { ...location },
      }),
  };
};

export default submodule;
