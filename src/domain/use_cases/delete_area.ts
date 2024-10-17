import { DeleteAreaRepository } from "../repositories/delete_area_repository";

export class DeleteArea {
  constructor(private readonly deleteAreaRepository: DeleteAreaRepository) {}

  async call(id: string): Promise<void> {
    await this.deleteAreaRepository.call(id);
  }
}
