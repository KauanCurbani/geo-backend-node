import { DataSource } from "typeorm";
import { DeleteAreaRepository } from "../../../domain/repositories/delete_area_repository";
import { Area } from "../../../domain/entities/area/area";

export class DbDeleteAreaRepository implements DeleteAreaRepository {
  constructor(private readonly dataSource: DataSource) {}

  async call(id: string): Promise<void> {
    await this.dataSource.getRepository(Area).softDelete(id);
  }
}
