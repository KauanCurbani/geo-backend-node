import { DataSource } from "typeorm";
import { ListAreasRepository } from "../../../domain/repositories/list_areas_repository";
import { Area } from "../../../domain/entities/area/area";

export class DbListAreasRepository implements ListAreasRepository {
  constructor(private readonly dataSource: DataSource) {}
  async list() {
    const areaRepository = this.dataSource.getRepository(Area);
    const areasRepo = await areaRepository.find({ order: { name: "ASC" } });

    const areas: ListAreasRepository.Result[] = areasRepo.map<ListAreasRepository.Result>(
      (area) => {
        const areaType: ListAreasRepository.Result = {
          id: area.id,
          name: area.name,
          color: area.color,
          polygon: area.polygon.coordinates[0].map((e) => [e[0], e[1]]),
        };

        return areaType;
      }
    );
    return areas;
  }
}
