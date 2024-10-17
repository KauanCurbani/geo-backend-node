import { Router } from "express";
import { z } from "zod";
import { CalculateRouteByPolygon } from "../../domain/use_cases/calculate_route_by_polygon";
import { GetPlacesInBounds } from "../../domain/use_cases/get_places_in_bounds";
import { GetPlacesInsidePolygonId } from "../../domain/use_cases/get_places_inside_polygon_id";
import { AppDataSource } from "../../infra/database/data-source";
import { DbGetAreaByIdRepository } from "../../infra/database/repositories/get_area_by_id_repository";
import { DbGetPlacesInBoundsRepository } from "../../infra/database/repositories/get_places_in_bounds_repository";
import { DbGetPlacesInsidePolygonRepository } from "../../infra/database/repositories/get_places_inside_polygon_repository";

const placesController = Router();

const getPlacesSchema = z.object({
  ne: z.string(),
  sw: z.string(),
});
type GetPlacesParams = z.infer<typeof getPlacesSchema>;

placesController.get("/", async (req, res) => {
  try {
    const { ne, sw } = getPlacesSchema.parse(req.query);
    const [neLat, neLon] = ne.split(",");
    const [swLat, swLon] = sw.split(",");

    const response = await new GetPlacesInBounds(
      new DbGetPlacesInBoundsRepository(AppDataSource)
    ).execute({
      ne: { lat: parseFloat(neLat), lng: parseFloat(neLon) },
      sw: { lat: parseFloat(swLat), lng: parseFloat(swLon) },
    });

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getPlacesInsidePolygonSchema = z.object({
  id: z.string(),
});

placesController.get("/inside/:id", async (req, res) => {
  try {
    const { id } = getPlacesInsidePolygonSchema.parse(req.params);

    const response = await new GetPlacesInsidePolygonId(
      new DbGetPlacesInsidePolygonRepository(AppDataSource),
      new DbGetAreaByIdRepository(AppDataSource)
    ).call(id);

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const calculateRouteByPolygonSchema = z.object({
  polygonId: z.string(),
});

placesController.post("/calc", async (req, res) => {
  try {
    const { polygonId } = calculateRouteByPolygonSchema.parse(req.body);

    const response = await new CalculateRouteByPolygon(
      new DbGetPlacesInsidePolygonRepository(AppDataSource),
      new DbGetAreaByIdRepository(AppDataSource)
    ).call(polygonId);

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default placesController;
