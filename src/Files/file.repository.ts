import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../Products/products.entity";
import { Repository } from "typeorm";


@Injectable()

export class FilesRepository{
    constructor(@InjectRepository(Products) private productRepositoryDB: Repository<Products>){}

    async updateFile(file: Express.Multer.File, productId:string){
               const product = await this.productRepositoryDB.findOneBy({id:productId})
               if(product){
                product.imgUrl = file.fieldname;
                await this.productRepositoryDB.save(product);
                console.log('Servicios',product)
               };
               return product;
                
    }
}
