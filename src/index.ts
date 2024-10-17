import { AppDataSource } from "./infra/database/data-source";
import express from "express";
import cors from "cors";
import userController from "./application/controllers/user_controller";
import placesController from "./application/controllers/places_controller";
import { polygonsController } from "./application/controllers/polygons_controller";
import dockingController from "./application/controllers/docking_controller";
import { authMiddleware } from "./application/middleware/auth-middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.use(userController);
app.use("/places", authMiddleware, placesController);
app.use("/polygons", authMiddleware, polygonsController);
app.use("/docking", authMiddleware, dockingController);

async function onInitializeDatabase() {
  console.log = (entry) => process.stdout.write("[INFO] " + entry + "\n");
  console.error = (entry) => process.stderr.write("[ERROR] " + entry + "\n");

  console.log("Database initialized");
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

AppDataSource.initialize()
  .then(onInitializeDatabase)
  .catch((error) => console.log(error));
