import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Products } from "./products.entity";
import { ProductsDto } from "../DTOs/createProduct.dto";

@Injectable()
export class ProductService{
    constructor(private productRepository: ProductsRepository){}

    async getProductsService():Promise<Products[]>{
        console.log('service1')
        const products = await this.productRepository.getProducts();
        console.log('service2')
        return products;
    }
    
    async getProductService(id:string):Promise <Products>{
        const product = await this.productRepository.getProduct(id);
        return product;
    }
    
    async createSeederProductService(newProduct: Partial<ProductsDto>[]):Promise<Partial<Products>[]>{
        const product= await this.productRepository.createSeederRepository(newProduct);
        console.log("Producto creado1");
        return product;
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
