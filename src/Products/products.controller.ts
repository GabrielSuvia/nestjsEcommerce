import { Body, Controller,Get, Param, Post, Put, Delete, Res,HttpException, HttpStatus,
         Query, ParseUUIDPipe} from "@nestjs/common";
import { ProductService } from "./products.service";
import { Response } from "express";
import { Products } from "./products.entity";
import { ProductsDto } from "../DTOs/createProduct.dto";
//import { RolesGuard } from "Auth/roles.guard";
//import { AuthGuard } from "Auth/auth.guard";

@Controller('products')
export class ProductsControllers{
    constructor(private readonly productService:ProductService){}

 @Get('pages')
 //@UseGuards(AuthGuard)
 async getProductBasic( @Res() res:Response, @Query('page') page?:string, @Query('limit') limit?:string){
        try {
                if(!page && !limit){
                        const products = await this.productService.basicProductService(1,5);
                        return res.status(200).send({message:"productos",productos:products})
                   }else{
                        const products = await this.productService.basicProductService(Number(page),Number(limit));
                        return res.status(200).json({message:"productos",productos:products})
                   }
        } catch (error) {
                throw new HttpException('Invalid pages',HttpStatus.CONFLICT)
        }
}

  @Get()
  async getProducts(@Res() res:Response){
    try {
        const products = await this.productService.getProductsService();
        if(products !== null){
            return res.status(200).json({message:"productos existentes", products:products});
        }
        
    } catch (error) {
        throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY)
    }
}

@Get(':id')
//@UseGuards(AuthGuard,RolesGuard)
async getProduct(@Res() res:Response, @Param('id', ParseUUIDPipe) id:string){
    try {
        const product = await this.productService.getProductService(id);
        return res.status(200).json({message:"product" ,products:product});
    } catch (error) {
        throw new HttpException('Invalid product', HttpStatus.BAD_REQUEST)
    }
        
}

@Post('seeder')
//@UseGuards(AuthGuard)
 async createSeederProduct(@Res() res:Response, @Body() newProduct:Partial<ProductsDto>[]){
       try {
        const product = await this.productService.createSeederProductService(newProduct);
        return res.status(201).json({message:"created products", product:product});
       } catch (error) {
        throw new HttpException('Product havent been created', HttpStatus.BAD_REQUEST)
       }
}


@Put(':id')
//@UseGuards(AuthGuard,RolesGuard)
 async updateProduct(@Param('id', ParseUUIDPipe) id:string,@Body() updateProduct: Partial<Products>, @Res() res:Response){
     try {
        const product = await this.productService.updateProductService(id, updateProduct);
       return res.status(200).json({message:"Producto actualizado",product: product})
     } catch (error) {
        throw new HttpException('Invalid Product', HttpStatus.BAD_REQUEST);
     }
 }

@Post('create')
//@UseGuards(AuthGuard)
 async createProduct(@Res() res:Response, @Body() newProduct:ProductsDto){
       try {
        const products = await this.productService.createProductService(newProduct);
        return res.status(201).json({message:"created product", product:products});
       } catch (error) {
        throw new HttpException('Product havent been created', HttpStatus.BAD_REQUEST)
       }     
}

@Delete(':id')
//@UseGuards(AuthGuard)
 async deleteProduct(@Param('id', ParseUUIDPipe) id:string, @Res() res:Response){
        try {
        const product = await this.productService.deleteProductService(id);
        res.status(200).send({message:"producto eliminado",products:product})
        } catch (error) {
         throw new HttpException('Invalid Product', HttpStatus.BAD_REQUEST)
        }
 }
}