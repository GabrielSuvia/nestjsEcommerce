import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserControllers } from "./users.controllers";
import { UserRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { LogeeMiddleware } from "../middleware/logge.middleware";


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