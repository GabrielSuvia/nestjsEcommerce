import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserControllers } from "./users.controllers";
import { LogeeMiddleware } from "src/middleware/logge.middleware";
import { UserRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
/*
const mockService ={
    getUsers: ()=>'Esto es una prueba de moks',

    {provide:UserService,
        useValue:mockService,}

const ACCES = "Accediendo a datos1"
{provide:"ACCES_TOKEN", useValue:ACCES}
};*/
@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    providers:[UserService,UserRepository],
    controllers:[UserControllers]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogeeMiddleware).forRoutes('user')
    }
    
}