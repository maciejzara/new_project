import React, { ReactNode, createContext, useEffect, useState } from "react";
import { LevelsTypeObject, LocationsTypesObject } from "types/Interfaces";
import Api from "services/Api";

type ContextTypes = {
  levels: LevelsTypeObject[];
  setLevels: React.Dispatch<React.SetStateAction<LevelsTypeObject[]>>;
  locations: LocationsTypesObject[];
  setLocations: React.Dispatch<React.SetStateAction<LocationsTypesObject[]>>;
  assignedLevels: Record<number, LocationsTypesObject[]>;
  setAssignedLevels: React.Dispatch<
    React.SetStateAction<Record<number, LocationsTypesObject[]>>
  >;
  gameData: gameDataStructureTypes;
  setGameData: React.Dispatch<React.SetStateAction<gameDataStructureTypes>>;
};

interface gameDataStructureTypes {
  user: string;
  levelId: number;
  locationScores: Map<number, number>;
}

const GameContext = createContext<ContextTypes | undefined>(undefined);

type GameProviderTypes = {
  children: ReactNode;
};

export const GameProvider: React.FC<GameProviderTypes> = ({ children }) => {
  const [levels, setLevels] = useState<LevelsTypeObject[]>([]);
  const [locations, setLocations] = useState<LocationsTypesObject[]>([]);

  const [assignedLevels, setAssignedLevels] = useState<
    Record<number, LocationsTypesObject[]>
  >({});

  //GET Levels
  useEffect(() => {
    const getLevels = async () => {
      const response = await Api.instance().AxiosGetLevels();
      setLevels(response.data.data);
    };
    getLevels();
  }, [setLevels]);

  //GET Locations
  useEffect(() => {
    const getLocations = async () => {
      const response = await Api.instance().AxiosGetLocations();
      setLocations(response.data.data);

      // Tablica ze ID Leveli i przypisanymi do niego lokalizacjami
      const assignedLocationToLevels: Record<number, LocationsTypesObject[]> =
        {};
      response.data.data.forEach((location: LocationsTypesObject) => {
        const locationLevels = location.attributes.levels?.data || [];
        locationLevels.forEach((level: LevelsTypeObject) => {
          if (assignedLocationToLevels[level.id]) {
            assignedLocationToLevels[level.id].push(location);
          } else {
            assignedLocationToLevels[level.id] = [location];
          }
        });
      });
      setAssignedLevels(assignedLocationToLevels);
      console.log(assignedLocationToLevels);
    };
    getLocations();
  }, []);

  const [gameData, setGameData] = useState({
    user: "",
    levelId: 0,
    locationScores: new Map(),
  });

  useEffect(() => {
    const gameDataToStorage = {
      ...gameData,
      locationScores: Array.from(gameData.locationScores),
    };
    console.log(gameData.locationScores, Array.from(gameData.locationScores));
    localStorage.setItem("GAME_STATUS", JSON.stringify(gameDataToStorage));
  }, [gameData]);

  useEffect(() => {
    const storedGameData = localStorage.getItem("GAME_STATUS");
    if (storedGameData) {
      const obj = JSON.parse(storedGameData);
      obj.levels = new Map(obj.levels);
      console.log("obj", obj);

      // setGameData(gameData);
    }
  }, [gameData]);

  const contextValues: ContextTypes = {
    levels,
    setLevels,
    locations,
    setLocations,
    assignedLevels,
    setAssignedLevels,
    gameData,
    setGameData,
  };

  // if (!assignedLevels) return <h1>Loading...</h1>;

  return (
    <GameContext.Provider value={contextValues}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
