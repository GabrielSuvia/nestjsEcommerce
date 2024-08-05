import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { OrderController } from "./oreders.controllers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { OrderService } from "./orders.service";
import { OrderRepository } from "./orders.repository";
import { Users } from "src/Users/users.entity";
import { Products } from "src/Products/products.entity";
import { OrderDetails } from "src/OrderDetaill/orderDetails.entity";
import { LogeeMiddleware } from "src/middleware/logge.middleware";

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