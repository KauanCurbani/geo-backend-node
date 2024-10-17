import { Place } from "../entities/place/place";

export interface GetPlacesInBoundsRepository {
  call(bounds: Bounds): Promise<Place[]>;
}

export type Bounds = {
  ne: {
    lat: number;
    lng: number;
  };
  sw: {
    lat: number;
    lng: number;
  };
};
