import { Docking } from "../entities/docking/docking";

export interface ListDockingRepository {
  list: () => Promise<Docking[]>;
}

export namespace ListDockingRepository {
  export type Result = {
    id: string;
    name: string;
    lat: number;
    lng: number;
  };
}
