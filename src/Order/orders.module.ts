import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { OrderController } from "./oreders.controllers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { OrderService } from "./orders.service";
import { OrderRepository } from "./orders.repository";
import { LogeeMiddleware } from "../middleware/logge.middleware";
import { OrderDetails } from "../OrderDetaill/orderDetails.entity";
import { Products } from "../Products/products.entity";
import { Users } from "../Users/users.entity";

@Module({
imports:[TypeOrmModule.forFeature([Orders]), TypeOrmModule.forFeature([Users]),TypeOrmModule.forFeature([Products]),
TypeOrmModule.forFeature([OrderDetails])],
providers:[OrderService,OrderRepository],
controllers:[OrderController]
})

export class OrderModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogeeMiddleware).forRoutes('orders')
    }
}