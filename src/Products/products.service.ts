import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Iproduct } from "./products.interface";
import { Products } from "./products.entity";

@Injectable()
export class ProductService{
    constructor(private productRepository: ProductsRepository){}

    async getProductsService():Promise<Products[]>{
        const products = await this.productRepository.getProducts();
        return products;
    }
    
    async getProductService(id:string):Promise <Products>{
        const product = await this.productRepository.getProduct(id);
        return product;
    }
    
    async createProductService(newProduct: Partial<Products>) :Promise<Products>{
        const product = await this.productRepository.createRepository(newProduct);
        console.log("Producto creado");
        return product;
    }
    
    async updateProductService(id:string):Promise<Products>{//???
        const product =  await this.productRepository.updateRepository(id)
        return product;
    }
    
    async deleteProductService(id:string): Promise<Products>{
       const producDelete = await this.productRepository.deleteRepository(id)
        return producDelete;
    }

    async basicProductService(page:number, limit:number): Promise<Products[]>{
        const products=  await this.productRepository.basicProductReository(page,limit)
        return products;
}
}
