import { Injectable } from "@nestjs/common";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/Products/products.entity";

@Injectable()
export class CategoriesRespository{
    constructor(@InjectRepository(Categories) private categoriesDB:Repository<Categories>,
  @InjectRepository(Products) private productsDB:Repository<Products>){}



 async getCategories(){
        const categories =  await this.categoriesDB.find();
        return categories;
 }

async addCategories(products: {name:string, description:string, price:number,
  stock:number, category:string}[]): Promise<Categories[]>{
    
          try {
            let categoriasType= await this.categoriesDB.find();

            const categoriesNew = products.map(async (prod)=>{//6

              for(let cat of categoriasType){//3
                  if(cat.name === prod.category){
                    //error
                    console.log("repetido")
                    continue;
                  }
                  //if this name of category is not in the array then try save

                  const newCategoria = {name:prod.category,products:null};//en producto
                 
                  const createCategoria = await this.categoriesDB.create(newCategoria);
          
                  console.log("categoriaRute2", createCategoria)
                    await this.categoriesDB.save(createCategoria);
                  return createCategoria;
    
              }
             
            });

            return Promise.all(categoriesNew) ;
          } catch (error) {
            throw new Error('Error');
          }
     
     
    }
  }