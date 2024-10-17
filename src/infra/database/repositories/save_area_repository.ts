import { DataSource } from "typeorm";
import { SaveAreaRepository } from "../../../domain/repositories/save_area_repository";
import { Area } from "../../../domain/entities/area/area";

export class DbSaveAreaRepository implements SaveAreaRepository {
  constructor(private readonly dataSource: DataSource) {}

  async save(area: SaveAreaRepository.Params) {
    const areaRepository = this.dataSource.getRepository(Area);
    console.log(JSON.stringify(area));
    const query = await areaRepository
      .createQueryBuilder("areas")
      .insert()
      .values({
        ...area,
        polygon: () =>
          `ST_GeomFromText('POLYGON((${area.polygon
            .map((e) => e.join(" "))
            .join(",")
            .trim()}))')`,
      })
      .execute();

    return query.raw[0];
  }
}
