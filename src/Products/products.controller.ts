import { Body, Controller,Get, Param, Post, Put, Delete, Res, UseGuards} from "@nestjs/common";
import { ProductService } from "./products.service";
import { Response } from "express";
import { Products } from "./products.entity";
import { AuthGuard } from "src/Auth/auth.guard";

@Controller('products')
export class ProductsControllers{
    constructor(private readonly productService:ProductService){}

 @Get('paginas')
getProductBasic( @Res() res:Response, @Param('page') page?:string, @Param('limit') limit?:string){
           if(!page && !limit){
                const products = this.productService.basicProductService(1,5);
                return res.status(200).json(`${products}`)
           }else{
                const products = this.productService.basicProductService(Number(page),Number(limit));
                return res.status(200).json(`${products}`)
           }
           //?????
}

@Get()
async getProducts(@Res() res:Response){
    
        const products = await this.productService.getProductsService();
        return res.status(200).json({products});
   
}

@Get(':id')
async getProduct(@Res() res:Response, @Param('id') id:string){
    
        const product = await this.productService.getProductService(id);
        console.log(product)
        return res.status(200).json({product});
   
}

@Post('create')
 async createProduct(@Res() res:Response, @Body() newProduct:Omit<Products,'id'>){

        const product = await this.productService.createProductService(newProduct);
        return res.status(201).json({product});
      
}

@Put(':id')
//@UseGuards(AuthGuard)
 async updateProduct(@Param('id') id:string, @Res() res:Response){

       const product = await this.productService.updateProductService(id);
       console.log(product)
       return res.status(200).json({product})

 }

@Delete(':id')
 async deleteProduct(@Param('id') id:string, @Res() res:Response){
      const product = await this.productService.deleteProductService(id);
      console.log("producto eliminado",product)
       res.status(200).json({product})
 }

}