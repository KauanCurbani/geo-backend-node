import "reflect-metadata";
import fetch from "node-fetch";
import { AppDataSource } from "../infra/database/data-source";
import { Place } from "../domain/entities/place/place";
import { Docking } from "../domain/entities/docking/docking";

async function main() {
  const docking = [
    {
      name: "Matriz",
      lat: -26.865305,
      lng: -49.0313442,
    },
    {
      name: "Cross Docking - Curitiba",
      lat: -25.566076899015755,
      lng: -49.18757101644384,
    },
  ];
  AppDataSource.getRepository(Docking).save(docking);
}

AppDataSource.initialize()
  .then(main)
  .catch((error) => console.log(error));
