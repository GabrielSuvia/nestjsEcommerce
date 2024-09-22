import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthControllers } from "./auth.controllers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../Users/users.entity";
import { LogeeMiddleware } from "../middleware/logge.middleware";

@Module({
    imports:[TypeOrmModule.forFeature([Users])],//funcionalidades
    providers:[AuthService],
    controllers:[AuthControllers]
})
export class AuthModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer.apply(LogeeMiddleware).forRoutes('auth');
    }
}