import { Router } from "express";
import { SearchPolygons } from "../../domain/use_cases/search_polygons";
import { CreateArea } from "../../domain/use_cases/create_area";
import { DbSaveAreaRepository } from "../../infra/database/repositories/save_area_repository";
import { AppDataSource } from "../../infra/database/data-source";
import { ListAreas } from "../../domain/use_cases/list_areas";
import { DbListAreasRepository } from "../../infra/database/repositories/list_areas_repository";
import { DeleteArea } from "../../domain/use_cases/delete_area";
import { DbDeleteAreaRepository } from "../../infra/database/repositories/delete_area_repository";

const polygonsController = Router();

polygonsController.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await new SearchPolygons().call(query as string);

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

polygonsController.post("/save", async (req, res) => {
  try {
    const body = req.body;
    const response = await new CreateArea(new DbSaveAreaRepository(AppDataSource)).call(body);

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

polygonsController.get("/all", async (req, res) => {
  try {
    const response = await new ListAreas(new DbListAreasRepository(AppDataSource)).call();
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

polygonsController.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await new DeleteArea(new DbDeleteAreaRepository(AppDataSource)).call(id);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

export { polygonsController };
