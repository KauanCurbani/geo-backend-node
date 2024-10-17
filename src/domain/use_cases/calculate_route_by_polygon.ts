import fetch from "node-fetch";
import { NotFoundError } from "../../errors";
import { Place } from "../entities/place/place";
import { GetAreaByIdRepository } from "../repositories/get_area_by_id_repository";
import { GetPlacesInsidePolygonRepository } from "../repositories/get_places_inside_polygon_repository";

interface LatLng {
  lat: number;
  lng: number;
}

export class CalculateRouteByPolygon {
  constructor(
    private readonly getPlacesInsidePolygonRepository: GetPlacesInsidePolygonRepository,
    private readonly getAreaByIdRepository: GetAreaByIdRepository
  ) {}

  async getDistanceMatrix(places: LatLng[], origin: LatLng): Promise<number[][]> {
    const allPlaces = [origin, ...places];
    const distanceMatrix: number[][] = [];

    for (let i = 0; i < allPlaces.length; i++) {
      distanceMatrix[i] = [];
      for (let j = 0; j < allPlaces.length; j++) {
        if (i !== j) {
          const distance = await this.getDistanceBetweenPlaces(allPlaces[i], allPlaces[j]);
          distanceMatrix[i][j] = distance;
        } else {
          distanceMatrix[i][j] = Infinity;
        }
      }
    }

    return distanceMatrix;
  }

  async call(polygonId: string) {
    const area = await this.getAreaByIdRepository.getAreaById(polygonId);
    console.log(JSON.stringify(area.docking));
    if (!area) throw new NotFoundError("Area not found");
    if (!area.docking) throw new NotFoundError("Docking not found");

    const places: Place[] = await this.getPlacesInsidePolygonRepository.call(area.polygon);
    const origin = { lat: area.docking.lat, lng: area.docking.lng };
    const distanceMatrix = await this.getDistanceMatrix(places, origin);

    let visited: number[] = [0];
    let remaining: number[] = Array.from({ length: places.length }, (_, i) => i + 1);

    while (remaining.length > 0) {
      let lastVisited = visited[visited.length - 1];
      let closest = remaining.reduce((min, place) => {
        return distanceMatrix[lastVisited][place] < distanceMatrix[lastVisited][min] ? place : min;
      }, remaining[0]);

      visited.push(closest);
      remaining = remaining.filter((place) => place !== closest);
    }

    let sortedPlaces: LatLng[] = [origin, ...visited.map((i) => places[i - 1])].filter((i) => i);
    const coords = sortedPlaces.map((place) => `${place.lng},${place.lat}`).join(";");

    const response = await fetch(
      `http://localhost:5000/route/v1/car/${coords}?overview=simplified&geometries=polyline6`
    )
      .then((res) => res.json())
      .catch((error) => Error(error));

    return {
      routes: response.routes,
      places: places.map((p) => ({
        id: p.id,
        name: p.name,
        position: [p.lat, p.lng],
      })),
    };
  }

  async getDistanceBetweenPlaces(origin: LatLng, destination: LatLng): Promise<number> {
    const response = await fetch(
      `http://localhost:5000/route/v1/car/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`
    ).then((res) => res.json());
    return response.routes[0].distance;
  }
}
