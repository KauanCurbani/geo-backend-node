import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../domain/entities/user/User";
import { Place } from "../../domain/entities/place/place";
import { Area } from "../../domain/entities/area/area";
import { Docking } from "../../domain/entities/docking/docking";
import { env } from "../../utils/env";

export const AppDataSource = new DataSource({
  url: env.DATABASE_URL,
  type: "postgres",
  synchronize: true,
  logging: false,
  entities: [User, Place, Area, Docking],
  migrations: [],
  subscribers: [],
  logger: "advanced-console",
});
