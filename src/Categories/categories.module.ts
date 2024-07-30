import { Module } from "@nestjs/common";
import { CategorieService } from "./categories.service";
import { CategoriesRespository } from "./categories.repository";
import { CategoriesControllers } from "./categories.controllers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/Products/products.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Categories]),TypeOrmModule.forFeature([Products])],
    providers:[CategorieService,CategoriesRespository],
    controllers:[CategoriesControllers]
})

export class Categories{

}