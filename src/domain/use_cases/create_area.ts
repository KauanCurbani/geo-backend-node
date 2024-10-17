import { SaveAreaRepository } from "../repositories/save_area_repository";

export class CreateArea {
  constructor(private readonly saveAreaRepo: SaveAreaRepository) {}

  async call(data: SaveAreaRepository.Params): Promise<void> {
    await this.saveAreaRepo.save(data);
  }
}
