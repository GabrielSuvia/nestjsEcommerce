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
    const arrCat = []
    products.forEach((prod)=>{
       if(arrCat === null){
        arrCat.push(prod.category)
       }else{
        const catExist = arrCat.find((cat)=>{return cat === prod.category})
        console.log(catExist)
        if(!catExist){
          arrCat.push(prod.category)
        }
       }
      
      });  console.log("listCategory",arrCat)
          try {
            //let categoriasType= await this.categoriesDB.find();
            console.log("2")
            const categoriesNew =Promise.all(arrCat.map(async (cat)=>{//6
                  console.log('1') 
                  const createCategoria = await this.categoriesDB.create({name:cat});
                  console.log("2rre",createCategoria)
                   const cate = await this.categoriesDB.save(createCategoria)
                    console.log("3",cate);

                  return await cate;
              }
            ))
            console.log('RepositoryReturn',categoriesNew)
            return categoriesNew;

          } catch (error) {
            throw new Error('Error');
          }
     
    }
  }