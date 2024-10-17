import { ListDockingRepository } from "../repositories/list_docking_repository";

export class ListDocking {
    constructor(private readonly listDockingRepo: ListDockingRepository) {}

    async call(): Promise<ListDockingRepository.Result[]> {
        return await this.listDockingRepo.list();
    }
}