import { randomUUID } from "crypto";
import fetch from "node-fetch";

export class SearchPolygons {
  async call(query: string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&polygon_geojson=1&format=jsonv2`
    ).then((res) => res.json());

    return { ...response[0].geojson, id: randomUUID() };
  }
}
