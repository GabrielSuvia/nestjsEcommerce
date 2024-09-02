import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Products } from "./products.entity";
import { ProductsDto } from "src/DTOs/createProduct.dto";

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
    
    async createSeederProductService(newProduct: ProductsDto[]):Promise<Partial<Products>[]>{
        const product= await this.productRepository.createSeederRepository(newProduct);
        console.log("Producto creado");
        return product;
    }

    async createProductService(newProduct: ProductsDto): Promise<string>{
        const productId = await this.productRepository.createRepository(newProduct);
        console.log("Producto creado");
        return productId;
    }
    
    async updateProductService(id:string, updateProduct: Partial<Products>):Promise<Products>{//???
        const product =  await this.productRepository.updateRepository(id, updateProduct)
        return product;
    }
    
    async deleteProductService(id:string): Promise<Products>{
       const producDelete = await this.productRepository.deleteRepository(id)
        return producDelete;
    }

    async basicProductService(page:number, limit:number): Promise<Products[]>{
        const products =  await this.productRepository.basicProductRepository(page,limit)
        return products;
}
}
