import { Injectable, OnModuleInit } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Products } from "./products.entity";
import { ProductsDto } from "../DTOs/createProduct.dto";
import { product } from "seeders/products";

@Injectable()
export class ProductService implements OnModuleInit{
    constructor(private productRepository: ProductsRepository){}
    
   async onModuleInit() {
        try {
            await this.productRepository.createSeederRepository(product)
           console.log("product is already registered")
        } catch (error) {
            console.error('Error initializing categories:', error.message)
        }
          
    }

    async getProductsService():Promise<Products[]>{
        console.log('service1')
        const products = await this.productRepository.getProducts();
        console.log('service2',products)
        return products;
    }
    
    async getProductService(id:string):Promise <Products>{
        const product = await this.productRepository.getProduct(id);
        return product;
    }
    
    async createSeederProductService(newProduct: Partial<ProductsDto>[]):Promise<void>{
        await this.productRepository.createSeederRepository(newProduct);
        console.log("Producto creado1");
     
    }

    async updateProductService(id:string, updateProduct: Partial<Products>):Promise<Products>{//???
        const product =  await this.productRepository.updateRepository(id, updateProduct)
        console.log('UPDATE')
        return product;
    }

    async createProductService(newProduct: ProductsDto): Promise<Partial<Products>>{
        const productId = await this.productRepository.createRepository(newProduct);
        console.log("PRODUCTSERVICE",productId);
        return productId;
    }
   
    async deleteProductService(id:string): Promise<Products>{
       const producDelete = await this.productRepository.deleteRepository(id)
        return producDelete;
    }

    async basicProductService(page:number, limit:number): Promise<Products[]>{
        const products =  await this.productRepository.basicProductRepository(page,limit)
        console.log('Service',products)
        return products;
}
}
