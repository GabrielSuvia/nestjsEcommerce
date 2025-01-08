import {DataSource, DataSourceOptions} from "typeorm";
import {config as dotenvConfig} from "dotenv"; 
import { registerAs } from "@nestjs/config";
dotenvConfig({path: 'src/.env.development'});
const config={
      type: "postgres",//process.env.DB_NAME.
      database: process.env.DBNAMER,
       host:process.env.DBHOSTR,
       port: Number(process.env.DBPORTR),
       username: process.env.DBUSERNAMER,
       password: process.env.DBPASSWORDR,
       autoLoadEntities:true,
       logging:true,
      // dropSchema:true,
      synchronize:true,
       entities:['dist/**/*.entity{.js,.ts}'],
       migrations: ['dist/migrations/*{.js,.ts}'],//comand npm run migration:generate src/migrations/name
}
export default registerAs('typeorms',()=> config)//REVISAR

export const connectionSource = new DataSource(config as DataSourceOptions)
