import {DataSource, DataSourceOptions} from "typeorm";
import {config as dotenvConfig} from "dotenv"; 
import { registerAs } from "@nestjs/config";

dotenvConfig({path: 'src/.env.development'});

const config={
      type: "postgres",//process.env.DB_NAME.
      database: process.env.DBNAME,
       host:process.env.DBHOST,
       port: Number(process.env.DBPORT),
       username: process.env.DBUSERNAME,
       password: process.env.DBPASSWORD,
       autoLoadEntities:true,
       logging:true,
      // dropSchema:true,
       synchronize:true,//sks
       entities:['dist/**/*.entity{.js,.ts}'],
       migrations: ['dist/migrations/*{.js,.ts}'],//comand npm run migration:generate src/migrations/name
}
console.log("environment variable", process.env.DBHOST,process.env.DBNAME, process.env.DBPORT, process.env.DBUSERNAME, process.env.DBPASSWORD)
export default registerAs('typeorms',()=> config)//REVISAR

export const connectionSource = new DataSource(config as DataSourceOptions)
