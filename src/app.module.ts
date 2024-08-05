import { Module } from '@nestjs/common';
import { UserModule } from './Users/users.module';
import { ProductModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { OrderModule } from './Order/orders.module';
import { FilesModule } from './Files/file.module';
import {JwtModule} from '@nestjs/jwt';
import { Categories } from './Categories/categories.entity';
import { CategoriesModule } from './Categories/categories.module';
//import { Users } from './Users/users.entity';
//import { Products } from './Products/products.entity';
/*
 type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Ageofultron123.",
    database: "demo",
    //dropSchema:true,
    synchronize: true,
    logging: false,//datos de la bd en consola
    entities: [Usser, Credential, Turn],
    subscribers: [],
    migrations: [],
    -------
     ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development'// load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService:ConfigService)=>({ //configService.typeorm;
       type:'postgres',
       database: configService.get('DB_NAME'),
       host: configService.get('DB_HOST'),
       port: configService.get('DB_PORT'),
       username: configService.get('DB_USERNAME'),
       password: String(configService.get('DB_PASSWORD')),
       synchronize:true,
       logging:true,
})})
      -----
  }),*/ 
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[typeOrmConfig]// load:[typeOrmConfig]//configService.typeorm;
  }),
  TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory: (configService:ConfigService) =>(configService.get('typeorms'))}), 
    JwtModule.register({
      global:true,
      signOptions:{expiresIn:'1h'},
      secret:'UnaClaveSecreta'//Varibale de entorono
    }),
     UserModule,ProductModule,AuthModule,OrderModule,FilesModule,CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
