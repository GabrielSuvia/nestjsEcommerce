import { Body, Controller,Get, Param, Post, Put, Delete, Res, UseGuards, BadRequestException, HttpException, HttpStatus, Query, ParseUUIDPipe} from "@nestjs/common";
import { ProductService } from "./products.service";
import { Response } from "express";
import { AuthGuard } from "src/Auth/auth.guard";
import { ProductsDto } from "src/DTOs/createProduct.dto";
import { RolesGuard } from "src/Auth/roles.guard";

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
                        const products = this.productService.basicProductService(Number(page),Number(limit));
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
        return res.status(200).json({message:"productos existentes", products:products});
    } catch (error) {
        throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY)
    }
   
}

@Get(':id')
@UseGuards(AuthGuard,RolesGuard)
async getProduct(@Res() res:Response, @Param('id', ParseUUIDPipe) id:string){
    try {
        const product = await this.productService.getProductService(id);
        console.log(product)
        return res.status(200).json({message:"product" ,products:product});
   
    } catch (error) {
        throw new HttpException('Invalid product', HttpStatus.BAD_REQUEST)
    }
        
}

@Post('seeder')
//@UseGuards(AuthGuard)
 async createSeederProduct(@Res() res:Response, @Body() newProduct:ProductsDto[]){
       try {//lOAD OF DATA
        const product = await this.productService.createSeederProductService(newProduct);
        return res.status(201).json({message:"created products", product:product});
       } catch (error) {
        throw new HttpException('Product havent been created', HttpStatus.BAD_REQUEST)
       }
       //hacer post??
      
}

@Post('create')
//@UseGuards(AuthGuard)
 async createProduct(@Res() res:Response, @Body() newProduct:ProductsDto){
       try {//lOAD OF DATA
        const productId = await this.productService.createProductService(newProduct);
        return res.status(201).json({message:"created product", product:productId});
       } catch (error) {
        throw new HttpException('Product havent been created', HttpStatus.BAD_REQUEST)
       }     
}


@Put(':id')
//@UseGuards(AuthGuard)
 async updateProduct(@Param('id', ParseUUIDPipe) id:string, @Res() res:Response){
     try {
        const product = await this.productService.updateProductService(id);
       console.log(product)
       return res.status(200).json({message:"Producto actualizado",product: product.id})

     } catch (error) {
        throw new HttpException('Invalid Product', HttpStatus.BAD_REQUEST);
     }
       
 }

@Delete(':id')
//@UseGuards(AuthGuard)
 async deleteProduct(@Param('id', ParseUUIDPipe) id:string, @Res() res:Response){
        try {
        const product = await this.productService.deleteProductService(id);
        console.log("producto eliminado",product)
        res.status(200).send({message:"producto eliminado",proucts:product.id})
        } catch (error) {
         throw new HttpException('Invalid Product', HttpStatus.BAD_REQUEST)
        }
 }
}