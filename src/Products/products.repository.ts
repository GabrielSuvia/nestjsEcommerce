import { Injectable } from "@nestjs/common";
import { Iproduct } from "./products.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./products.entity";
import { Repository } from "typeorm";
import { ProductsDto } from "src/DTOs/createProduct.dto";
import { Categories } from "src/Categories/categories.entity";


@Injectable()
export class ProductsRepository{
    constructor(@InjectRepository(Products) private productRepositoryDB: Repository<Products>,
  @InjectRepository(Categories) private categoriesRepositoryDB: Repository<Categories>){}

private products = [ {
    "name": "Iphone 15",
    "description": "The best smartphone in the world",
    "price": 199.99,
    "stock": 12,
    "category": "smartphone"
  },
  {
    "name": "Samsung Galaxy S23",
    "description": "The best smartphone in the world",
    "price": 150.0,
    "stock": 12,
    "category": "smartphone"
  },
  {
    "name": "Motorola Edge 40",
    "description": "The best smartphone in the world",
    "price": 179.89,
    "stock": 12,
    "category": "smartphone"
  },
  {
    "name": "Samsung Odyssey G9",
    "description": "The best monitor in the world",
    "price": 299.99,
    "stock": 12,
    "category": "monitor"
  },
  {
    "name": "LG UltraGear",
    "description": "The best monitor in the world",
    "price": 199.99,
    "stock": 12,
    "category": "monitor"
  },
  {
    "name": "Acer Predator",
    "description": "The best monitor in the world",
    "price": 150.0,
    "stock": 12,
    "category": "monitor"
  },
  {
    "name": "Razer BlackWidow V3",
    "description": "The best keyboard in the world",
    "price": 99.99,
    "stock": 12,
    "category": "keyboard"
  },
  {
    "name": "Corsair K70",
    "description": "The best keyboard in the world",
    "price": 79.99,
    "stock": 12,
    "category": "keyboard"
  },
  {
    "name": "Logitech G Pro",
    "description": "The best keyboard in the world",
    "price": 59.99,
    "stock": 12,
    "category": "keyboard"
  },
  {
    "name": "Razer Viper",
    "description": "The best mouse in the world",
    "price": 49.99,
    "stock": 12,
    "category": "mouse"
  },
  {
    "name": "Logitech G502 Pro",
    "description": "The best mouse in the world",
    "price": 39.99,
    "stock": 12,
    "category": "mouse"
  },
  {
    "name": "SteelSeries Rival 3",
    "description": "The best mouse in the world",
    "price": 29.99,
    "stock": 12,
    "category": "mouse"
  }
]

async getProducts(){
    const products = await this.productRepositoryDB.find();
    return products;
}

async getProduct(id:string){
    const productFound =await this.productRepositoryDB.findOneBy({id})
    if(!productFound){
       throw new Error('Product Not Found');
    };
    return productFound;
}

async createSeederRepository(newProduct:Partial<ProductsDto>[]):Promise<Partial<ProductsDto>[]>{

      //LOAD OF DATA
    const categoriesList = await this.categoriesRepositoryDB.find();

    

    const newProducts = newProduct.map(async (prod)=>{
      for(const cat of categoriesList){
           if(cat.name === prod.category){
            prod.categoryId.push(cat);
            const {category,...rest} = prod;

            const product = await this.productRepositoryDB.create(rest);

            if(!product){
              throw new Error("Bad requesting");
               };
                await this.productRepositoryDB.save(product);
               return product;
           }
      };
        return prod;
    })

   
   return Promise.all(newProducts);//returna un promise all cuando es un array
    
}

async createRepository(productNew:ProductsDto): Promise<string>{
  
    const newProduct = await this.productRepositoryDB.create(productNew);

    const productExist = await this.productRepositoryDB.findOneBy({name: newProduct.name});
     
   if(!productExist){
      await this.productRepositoryDB.save(newProduct)
      return newProduct.id;
      }
      throw new Error('Name already exist');
    
}

async updateRepository(id:string):Promise<Products>{//revision
    const idProduct = await this.productRepositoryDB.findOneBy({id});
      if(!idProduct){
          throw new Error("Product not Found");
        };
        return idProduct;//????
    }

async deleteRepository(id:string): Promise<Products>{
    const productDeleted = await this.productRepositoryDB.findOneBy({id})
    const product = await this.productRepositoryDB.delete({id});
    if(product.affected === 0){
        throw new Error("error");
    };

        return productDeleted ;

}

async basicProductRepository(page:number, limit:number): Promise<Products[]>{
    const start = (page-1)*limit;
    const end = start+limit;
    const arrProd = await this.productRepositoryDB.find();
    const products = arrProd.slice(start,end);
    return products;
}

}