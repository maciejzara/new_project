// LEVELS types

export interface LevelsTypeObject {
  data: LevelsTypeObject;
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

// Markers

export interface MarkersTypes {
  lat: number;
  lng: number;
}

export interface WorldMapProps {
  markers: MarkersTypes[];
  setMarkers: React.Dispatch<React.SetStateAction<MarkersTypes[]>>;
}
