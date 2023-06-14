import { AxiosInstance } from "axios";
import { LevelsTypeObject } from "types/Interfaces";

const submodule = (client: AxiosInstance) => {
  return {
    // GET Levels
    AxiosGetLevels: () => client.get("/levels"),

    // POST Level
    AxiosAddLevel: (name: string, description: string) =>
      client.post<LevelsTypeObject>("/levels", {
        data: {
          name,
          description,
        },
      }),

    // DELETE Level
    AxiosDeleteLevel: (id: number) => client.delete(`/levels/${id}`),
  };
};

export default submodule;
