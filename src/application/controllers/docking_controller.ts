import { Router } from "express";
import { ListDocking } from "../../domain/use_cases/list_docking";
import { DbListDockingRepository } from "../../infra/database/repositories/list_docking_repository";
import { AppDataSource } from "../../infra/database/data-source";

const dockingController = Router();

dockingController.get("/", async (req, res) => {
  try {
    const response = await new ListDocking(new DbListDockingRepository(AppDataSource)).call();
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default dockingController;