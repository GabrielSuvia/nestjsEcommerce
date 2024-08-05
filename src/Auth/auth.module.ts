import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthControllers } from "./auth.controllers";
import { UserModule } from "src/Users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/Users/users.entity";
import { LogeeMiddleware } from "src/middleware/logge.middleware";

@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    providers:[AuthService],
    controllers:[AuthControllers]
})
export class AuthModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer.apply(LogeeMiddleware).forRoutes('auth');
    }
}