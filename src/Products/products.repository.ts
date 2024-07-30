import { Injectable } from "@nestjs/common";
import { Iproduct } from "./products.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./products.entity";
import { Repository } from "typeorm";


@Injectable()
export class ProductsRepository{
    constructor(@InjectRepository(Products) private productRepositoryDB: Repository<Products>){}
private products = [{
    id:1,
name: "Celular",
description: "Tipo A",
price: 70,
stock: true,
imgUrl: "wwww.imagenUrl.com",
},
{
    id:2,
name: "Celular",
description: "Tipo B",
price: 80,
stock: true,
imgUrl: "wwww.imagenUrl.com",
},
{
    id:3,
name: "Celular",
description: "Tipo C",
price: 98,
stock: false,
imgUrl: "wwww.imagenUrl.com",
}
]

async getProducts(){
    const products = await this.productRepositoryDB.find();
    return products;
}

async getProduct(id:string){
    const productFound =await this.productRepositoryDB.findOneBy({id})
    if(!productFound){
       throw new Error('Product Not Found');
    }
    return productFound;
}

async createRepository(newProduct: Partial<Products>):Promise<Products>{
   
    const product = await this.productRepositoryDB.create(newProduct);
     await this.productRepositoryDB.save(product);
    return product;
    
}

async updateRepository(id:string):Promise<Products>{//revision
    const idProduct = await this.productRepositoryDB.findOneBy({id});
      if(!idProduct){
          throw new Error("Product not Found")
        }
        return idProduct;//????
    }

async deleteRepository(id:string): Promise<Products>{
    const product = await this.productRepositoryDB.delete({id});
    if(product.affected === 0){
        throw new Error("error");
    };
   
       const productDeleted = await this.productRepositoryDB.findOneBy({id})
        return productDeleted ;

}

async basicProductReository(page:number, limit:number): Promise<Products[]>{
    const start = (page-1)*limit;
    const end = start+limit
    const arrProd = await this.productRepositoryDB.find();
    const products = arrProd.slice(start,end)
    return products;
}

}