import { ListAreasRepository } from "../repositories/list_areas_repository";

export class ListAreas {
  constructor(private readonly listAreasRepo: ListAreasRepository) {}

  async call(): Promise<ListAreasRepository.Result[]> {
    return await this.listAreasRepo.list();
  }
}