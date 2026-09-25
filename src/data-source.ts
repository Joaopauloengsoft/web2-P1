import { dirname, parse } from "node:path";
import { fileURLToPath } from "url";
import "reflect-metadata";
import { DataSource } from "typeorm";

//Importar Variaves de Ambiente 
import dotenv from "dotenv";

//Carregando as variaveis do .env
dotenv.config()

    const dialect = process.env.DB_DIALECT ?? "mysql"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);    

export const AppDataSource = new DataSource({
    type: process.env.DB_DIALECT as "mysql",
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) :3306,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    synchronize: false,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
}) 