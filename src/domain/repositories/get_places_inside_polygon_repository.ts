import { Polygon } from "typeorm";
import { Place } from "../entities/place/place";

export interface GetPlacesInsidePolygonRepository {
  call(polygon: Polygon): Promise<Place[]>;
}
