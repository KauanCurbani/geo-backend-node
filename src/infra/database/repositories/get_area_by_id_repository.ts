import { DataSource } from "typeorm";
import { GetAreaByIdRepository } from "../../../domain/repositories/get_area_by_id_repository";
import { Area } from "../../../domain/entities/area/area";

export class DbGetAreaByIdRepository implements GetAreaByIdRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getAreaById(id: string): Promise<Area> {
    const resp = this.dataSource
      .getRepository("Area")
      .createQueryBuilder("area")
      .leftJoinAndSelect("area.docking", "docking")
      .where("area.id = :id", { id });

    return (await resp.getOne()) as Area;
  }
}
