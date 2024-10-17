import { DataSource, Polygon } from "typeorm";
import { GetPlacesInsidePolygonRepository } from "../../../domain/repositories/get_places_inside_polygon_repository";
import { Place } from "../../../domain/entities/place/place";

export class DbGetPlacesInsidePolygonRepository implements GetPlacesInsidePolygonRepository {
  constructor(private readonly dataSource: DataSource) {}

  async call(polygon: Polygon): Promise<Place[]> {
    const formattedPolygon = polygon.coordinates[0].map((coord) => coord.join(" ")).join(",");
    const resp = this.dataSource
      .getRepository(Place)
      .createQueryBuilder("place")
      .where(
        `ST_Contains(
           ST_SetSRID(
             ST_GeomFromText(:polygon, 4326), 
             4326
           ),
           ST_SetSRID(ST_MakePoint(place.lng, place.lat), 4326)
         ) 
         AND place.deletedAt IS NULL`,
        { polygon: `POLYGON((${formattedPolygon}))` } // Passando o polígono como parâmetro
      );

    return await resp.getMany();
  }
}
