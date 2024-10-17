import { Polygon } from "typeorm";
import { Place } from "../entities/place/place";
import { GetPlacesInsidePolygonRepository } from "../repositories/get_places_inside_polygon_repository";

export class GetPlacesInsidePolygon {
  constructor(
    private readonly getPlacesInsidePolygonRepository: GetPlacesInsidePolygonRepository
  ) {}

  async call(polygon: Polygon): Promise<Place[]> {
    return this.getPlacesInsidePolygonRepository.call(polygon);
  }
}
