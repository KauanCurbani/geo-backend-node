import {
  Bounds,
  GetPlacesInBoundsRepository,
} from "../repositories/get_places_in_bounds_repository";

export class GetPlacesInBounds {
  constructor(private readonly getPlacesInBoundsRepo: GetPlacesInBoundsRepository) {}

  async execute(bounds: Bounds) {
    const response = await this.getPlacesInBoundsRepo.call(bounds);
    return response.map((place) => ({
      id: place.id,
      name: place.name,
      position: [place.lat, place.lng],
    }));
  }
}
