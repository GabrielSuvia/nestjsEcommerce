import { Injectable } from "@nestjs/common";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoriesRespository{
    constructor(@InjectRepository(Categories) private categoriesDB:Repository<Categories>){}

 async getCategories(){
        const categories =  await this.categoriesDB.find({relations:['products']});
        return categories;
 }

async addCategories(products: {name:string,description:string,
  price:number, stock:number, category:string}[]): Promise<void>{

    const arrCat = await this.categoriesDB.find();//[]
    const listCat = []

  //verify if the categories is already exist
    if(arrCat && arrCat.length === 0){
    products.forEach((prod)=>{

        if(!listCat.includes(prod.category)){
          listCat.push(prod.category)
        }})
      
  // add the list of category
    if(listCat.length>0){
      try {
        listCat.forEach(async (cat)=>{//6       
              const createCategoria = await this.categoriesDB.create({name:cat});        
                await this.categoriesDB.save(createCategoria)
          })
        console.log("New products registered")
      } catch (error) {
        throw new Error('Error');
      }}}
      console.log("the categories is already registereds")
    };
  }