import axios, { AxiosInstance } from "axios";
import level from "services/level";
import location from "services/location";

const api = (client: AxiosInstance) => {
  return {
    ...location(client),
    ...level(client),
  };
};

let apiInstance: ReturnType<typeof api>;

const ret = {
  instance: (): ReturnType<typeof api> => {
    if (apiInstance) {
      return apiInstance;
    }

    const token = `Bearer ${process.env.REACT_APP_API_KEY}`;

    const client = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    apiInstance = api(client);

    return apiInstance;
  },
};

export default ret;
