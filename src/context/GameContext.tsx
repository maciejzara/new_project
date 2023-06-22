import React, { ReactNode, createContext, useState } from "react";
import { LevelsTypeObject, LocationsTypesObject } from "types/Interfaces";

type ContextTypes = {
  levels: LevelsTypeObject[];
  setLevels: React.Dispatch<React.SetStateAction<LevelsTypeObject[]>>;
  locations: LocationsTypesObject[];
  setLocations: React.Dispatch<React.SetStateAction<LocationsTypesObject[]>>;
  assignedLevels: Record<number, LocationsTypesObject[]>;
  setAssignedLevels: React.Dispatch<
    React.SetStateAction<Record<number, LocationsTypesObject[]>>
  >;
};

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

  const contextValues: ContextTypes = {
    levels,
    setLevels,
    locations,
    setLocations,
    assignedLevels,
    setAssignedLevels,
  };

  return (
    <GameContext.Provider value={contextValues}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
