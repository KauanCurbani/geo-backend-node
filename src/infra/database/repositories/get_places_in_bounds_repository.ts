import { DataSource } from "typeorm";
import {
  Bounds,
  GetPlacesInBoundsRepository,
} from "../../../domain/repositories/get_places_in_bounds_repository";
import { Place } from "../../../domain/entities/place/place";

export class DbGetPlacesInBoundsRepository implements GetPlacesInBoundsRepository {
  constructor(private readonly dataSource: DataSource) {}

  async call(bounds: Bounds): Promise<Place[]> {
    const resp = await this.dataSource
      .getRepository(Place)
      .createQueryBuilder("place")
      .where("place.lat < :neLat", { neLat: bounds.ne.lat })
      .andWhere("place.lng < :neLng", { neLng: bounds.ne.lng })
      .andWhere("place.lat > :swLat", { swLat: bounds.sw.lat })
      .andWhere("place.lng > :swLng", { swLng: bounds.sw.lng })
      .getMany();

    return resp;
  }
}
