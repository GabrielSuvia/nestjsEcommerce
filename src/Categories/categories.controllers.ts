import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from "@nestjs/common";
import { CategorieService } from "./categories.service";
import { Categories } from "./categories.entity";
import { Products } from "src/Products/products.entity";
import { Response } from "express";



@Controller('categories')

export class CategoriesControllers{
   constructor(private categoriesService:CategorieService){
   }
    @Get()
    async getCategoriesControllers(@Res() res:Response){
         try {
          const cate = await this.categoriesService.getCategoriesService();
          return res.status(200).send({message:'Categories obtenidas', categories:cate})
         } catch (error) {
          throw new HttpException('Server error', HttpStatus.BAD_GATEWAY)
         } 
        
    }

    @Post('seeded')
   async addCategoriesControllers( @Res() res:Response, @Body() products:{name:string,description:string,
    price:number, stock:number, category:string}[] ){
          try {
            console.log("entradas")
            const categoriasNew: Categories[] = await this.categoriesService.addCategorieService(products);
            console.log('controllers2',products)
             return res.status(200).send({message:'received data', dato:categoriasNew})
         }catch (error) {
          throw new HttpException('Invalid Category', HttpStatus.BAD_REQUEST)
        }
      
//falta??????
        }
        
    }