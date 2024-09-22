import { Injectable } from "@nestjs/common";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Console } from "console";
import { Products } from "../Products/products.entity";

@Injectable()
export class CategoriesRespository{
    constructor(@InjectRepository(Categories) private categoriesDB:Repository<Categories>,
  @InjectRepository(Products) private productsDB:Repository<Products>){}



 async getCategories(){
        const categories =  await this.categoriesDB.find({relations:['products']});
        return categories;
 }

async addCategories(products: {name:string,description:string,
  price:number, stock:number, category:string}[]): Promise<Categories[]>{
    console.log("1")
          try {
            //let categoriasType= await this.categoriesDB.find();
            console.log("2")
            const categoriesNew = products.map(async (prod)=>{//6
              
                  const {category, ...rest} = prod;//en producto
                  console.log("1")
                  const createCategoria = await this.categoriesDB.create({name:category});
                  console.log("2")
                    await this.categoriesDB.save(createCategoria)
                    console.log("3");

                  return createCategoria;
              }
            );
            return Promise.all(categoriesNew) ;

          } catch (error) {
            throw new Error('Error');
          }
     
     
    }
  }