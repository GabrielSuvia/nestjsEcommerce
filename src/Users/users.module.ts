import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserControllers } from "./users.controllers";
import { LogeeMiddleware } from "src/middleware/logge.middleware";
import { UserRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";


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