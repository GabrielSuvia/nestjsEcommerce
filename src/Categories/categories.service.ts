import { Injectable, OnModuleInit } from "@nestjs/common";
import { CategoriesRespository } from "./categories.repository";
import { Categories } from "./categories.entity";
import { product } from "helpers/products";

@Injectable()
export class CategorieService implements OnModuleInit {
    constructor(private categoriesRepository: CategoriesRespository){}
    
 async onModuleInit() {
  try {
      await this.categoriesRepository.addCategories(product);
      console.log("Initialize Product Lists")
   
  } catch (error) {
    console.error('Error initializing categories:', error.message);
  }}

  async getCategoriesService(){
         const categories= await this.categoriesRepository.getCategories();
         return categories;
   }

  async addCategorieService (products:{name:string,description:string,
    price:number, stock:number, category:string}[]):Promise<void> {
    await this.categoriesRepository.addCategories(products);
 
   }

}