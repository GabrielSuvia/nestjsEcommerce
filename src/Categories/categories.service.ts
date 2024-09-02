import { Injectable } from "@nestjs/common";
import { CategoriesRespository } from "./categories.repository";

@Injectable()
export class CategorieService{
    constructor(private categoriesRepository: CategoriesRespository){}

  async getCategoriesService(){
         const categories= await this.categoriesRepository.getCategories();
         return categories;
   }

  async addCategorieService (products:{name:string,description:string,
    price:number, stock:number, category:string}[]) {
      
    const newCategories = await this.categoriesRepository.addCategories(products);
     return newCategories;
   }

}