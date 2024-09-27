import { Injectable } from "@nestjs/common";
import { CategoriesRespository } from "./categories.repository";
import { Categories } from "./categories.entity";

@Injectable()
export class CategorieService{
    constructor(private categoriesRepository: CategoriesRespository){}

  async getCategoriesService(){
         const categories= await this.categoriesRepository.getCategories();
         return categories;
   }

  async addCategorieService (products:{name:string,description:string,
    price:number, stock:number, category:string}[]):Promise<Categories[]> {
      
    const newCategories = await this.categoriesRepository.addCategories(products);
     return newCategories;
   }

}