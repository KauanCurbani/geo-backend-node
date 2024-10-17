import { GetAreaByIdRepository } from "../repositories/get_area_by_id_repository";
import { GetPlacesInsidePolygonRepository } from "../repositories/get_places_inside_polygon_repository";

export class GetPlacesInsidePolygonId {
  constructor(
    private readonly getPlacesInsidePolygonIdRepository: GetPlacesInsidePolygonRepository,
    private readonly getAreaByIdRepository: GetAreaByIdRepository
  ) {}

  async call(polygonId: string) {
    const polygon = await this.getAreaByIdRepository.getAreaById(polygonId);
    if (!polygon) {
      throw new Error("Polygon not found");
    }
    return this.getPlacesInsidePolygonIdRepository.call(polygon.polygon);
  }
}
