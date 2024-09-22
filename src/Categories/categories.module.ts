import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CategorieService } from "./categories.service";
import { CategoriesRespository } from "./categories.repository";
import { CategoriesControllers } from "./categories.controllers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Products } from "../Products/products.entity";
import { LogeeMiddleware } from "../middleware/logge.middleware";


@Module({
    imports:[TypeOrmModule.forFeature([Categories]),TypeOrmModule.forFeature([Products])],
    providers:[CategorieService,CategoriesRespository],
    controllers:[CategoriesControllers]
})

export class CategoriesModule implements NestModule{
     configure(consumer: MiddlewareConsumer) {
         consumer.apply(LogeeMiddleware).forRoutes('categories');
     }
}