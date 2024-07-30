import { Injectable } from "@nestjs/common";
import { CategoriesRespository } from "./categories.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
import { Products } from "src/Products/products.entity";

@Injectable()
export class CategorieService{
    constructor(private categoriesRepository: CategoriesRespository){}
  async getCategoriesService(){
         const categories= await this.categoriesRepository.getCategories;
         return categories;
   }

  async addCategorieService(category:{name:string, products: Partial<Products>}){
    const newCategories = await this.categoriesRepository.addCategories(category);
    //condicional si la categoria no existe en newCategoria => envia: erro
     return newCategories;
   }

}