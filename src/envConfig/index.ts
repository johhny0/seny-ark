import dotenv from "dotenv";
import { MorganEnum } from "../api/morganEnum";

dotenv.config();

export class EnvConfig {
    useMorgan: boolean = true;
    useHelmet: boolean = true;
    useCors: boolean = true;
    port: number = 3000;
    host: string | undefined = "http://localhost";
    applicationName?: string;
    morganFormat: string = MorganEnum.Dev

    load() {
        this.useMorgan = Boolean(process.env.API_USE_MORGAN);
        this.useHelmet = Boolean(process.env.API_USE_HELMET);
        this.useCors = Boolean(process.env.API_USE_CORS);
        this.port = Number(process.env.API_PORT);
        this.host = process.env.API_HOST;
        this.applicationName = process.env.APPLICATION_NAME;
        this.morganFormat = process.env.API_MORGAN_FORMAT ?? "";
    }

}








