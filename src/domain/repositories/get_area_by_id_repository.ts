import { Area } from "../entities/area/area";

export interface GetAreaByIdRepository {
  getAreaById: (areaId: string) => Promise<Area>;
}
