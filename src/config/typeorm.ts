import {DataSource, DataSourceOptions} from "typeorm";
import {config as dotenvConfig} from "dotenv";
import { registerAs } from "@nestjs/config";

dotenvConfig({path: './.env.development'});

const config={
        type: "postgres",//process.env.DB_NAME
        database: "demo",
       host: process.env.DB_HOST,
       port: process.env.DB_PORT as unknown as number,
       username: "postgres",
       password: "Ageofultron123.",
       autoLoadEntities:true,
       logging:true,
       synchronize:false,
       entities:['dist/**/*.entity{.js,.ts}'],
       migrations: ['dist/migrations/*{.js,.ts}'],//comand npm run migration:generate src/migrations/name
}
export default registerAs('typeorms',()=> config)//REVISAR

export const connectionSource = new DataSource(config as DataSourceOptions)
