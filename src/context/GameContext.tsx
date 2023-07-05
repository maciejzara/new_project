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
  levels: Map<any, any>;
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

      window.localStorage.setItem("LOCATIONS", JSON.stringify(locations));

      // Tablica ze ID Leveli i przypisanymi do niego lokalizacjami
      const assignedLevelsData: Record<number, LocationsTypesObject[]> = {};
      response.data.data.forEach((location: LocationsTypesObject) => {
        const locationLevels = location.attributes.levels?.data || [];
        locationLevels.forEach((level: LevelsTypeObject) => {
          const levelId = level.id;
          if (assignedLevelsData[levelId]) {
            assignedLevelsData[levelId].push(location);
          } else {
            assignedLevelsData[levelId] = [location];
          }
        });
      });
      setAssignedLevels(assignedLevelsData);
    };
    getLocations();
  }, [setAssignedLevels, setLocations, locations]);

  const [gameData, setGameData] = useState({
    user: "",
    levels: new Map(),
  });

  useEffect(() => {
    const gameDataToStorage = {
      user: gameData.user,
      levels: Array.from(gameData.levels),
    };
    localStorage.setItem("GAME_STATUS", JSON.stringify(gameDataToStorage));
  }, [gameData]);

  useEffect(() => {
    const storedGameData = localStorage.getItem("GAME_STATUS");
    if (storedGameData) {
      const obj = JSON.parse(storedGameData);
      obj.levels = new Map(obj.levels);
      console.log(obj);

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

  return (
    <GameContext.Provider value={contextValues}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
