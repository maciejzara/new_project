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
  longitude: string;
  latitude: string;
  continent: string;
  country: string;
}

export interface Form_Table_Props {
  levels: LevelsTypeObject[];
  setLevels: React.Dispatch<React.SetStateAction<LevelsTypeObject[]>>;
  locations: LocationsTypesObject[];
  setLocations: React.Dispatch<React.SetStateAction<LocationsTypesObject[]>>;
}

// export interface LevelsProps {
//   levels: LevelsTypes[];
//   setLevels: React.Dispatch<React.SetStateAction<LevelsTypes>>;
//   //   setLevels: (levels: LevelsTypes[]) => void;
// }

// export interface LocationProps {
//   locations: LocationsTypes[];
//   setLocations: React.Dispatch<React.SetStateAction<LocationsTypes>>;
//   //   setLocations: (locations: LocationsTypes[]) => void;
// }

// export interface FormProps {
//   levelsProps: LevelsProps;
//   locationProps: LocationProps;
// }
