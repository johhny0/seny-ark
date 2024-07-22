import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { Dino } from "./entities/dino.entity";


config();


export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'seny-ark',
    entities: [Dino],
    //migrations: ["dist/src/db/migrations/*.js"],
    logging: true,
    synchronize: true
}
const AppDataSource = new DataSource(dataSourceOptions)
export default AppDataSource
