// LEVELS types

export interface LevelsTypeObject {
  id: number;
  attributes: LevelsTypes;
}

export interface LevelsTypes {
  name: string;
  description: string;
}

// LOCATION types

export interface LocationsTypesObject {
  id: number;
  attributes: LocationsTypes;
}

export interface LocationsTypes {
  name: string;
  longitude: string;
  latitude: string;
  continent: string;
  country: string;
  levels: {
    data: LevelsTypeObject[];
  };
}

export interface Form_Table_Props {
  levels: LevelsTypeObject[];
  setLevels: React.Dispatch<React.SetStateAction<LevelsTypeObject[]>>;
  locations: LocationsTypesObject[];
  setLocations: React.Dispatch<React.SetStateAction<LocationsTypesObject[]>>;
}
