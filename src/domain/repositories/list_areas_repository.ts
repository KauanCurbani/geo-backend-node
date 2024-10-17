export interface ListAreasRepository {
  list: () => Promise<ListAreasRepository.Result[]>;
}

export namespace ListAreasRepository {
  export type Result = {
    id: string;
    name: string;
    polygon: [number, number][];
    color: string;
  };
}
