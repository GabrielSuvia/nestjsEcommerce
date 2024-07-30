import { Module } from "@nestjs/common";
import { FilesRepository } from "./file.repository";
import { FilesServices } from "./files.service";
import { FilesControllers } from "./files.controllers";
import { CloudingConfig } from "src/config/cloudinary";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/Products/products.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Products])],
    providers:[CloudingConfig,FilesServices,FilesRepository],
    controllers:[FilesControllers]
})

export class FilesModule{}