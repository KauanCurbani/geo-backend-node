import { DataSource } from "typeorm";
import { ListDockingRepository } from "../../../domain/repositories/list_docking_repository";
import { Docking } from "../../../domain/entities/docking/docking";

export class DbListDockingRepository implements ListDockingRepository {
  constructor(private readonly dataSource: DataSource) {}

  async list(): Promise<Docking[]> {
    try {
      const docking = await this.dataSource.getRepository(Docking).find();
      return docking;
    } catch (e) {
      console.log(e);
      throw new Error("Error listing docking");
    }
  }
}
