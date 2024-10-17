import { Area } from "../entities/area/area";

export interface SaveAreaRepository {
  save: (area: SaveAreaRepository.Params) => Promise<Area>;
}

export namespace SaveAreaRepository {
  export type Params = {
    id?: string;
    name: string;
    polygon: [number, number][];
    color: string;
    dockingId: string;
  };
}
