import { DataSource } from "typeorm";
import { Dino } from "./entities/dino.entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Dino],
    subscribers: [],
    migrations: [],
})