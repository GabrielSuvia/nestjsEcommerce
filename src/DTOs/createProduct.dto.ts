import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { Categories } from "src/Categories/categories.entity"
import { OrderDetails } from "src/OrderDetaill/orderDetails.entity"


export class ProductsDto{
  
  @IsString()
  @IsNotEmpty()
    name: string

   @IsString()
   @IsNotEmpty()
    description: string

  @IsNumber()
  @IsNotEmpty()
    price: number

  @IsNumber()
  @IsNotEmpty()
    stock: number

   @IsString()
    imgUrl: string

   @IsString()
   category:string

    @IsOptional()
    @IsArray()
    //@ValidateNested({each: true})
    @Type(()=> Categories)
    categoryId: Categories[]
   
    @IsOptional()
    @IsArray()
   // @ValidateNested({each:true})
   @Type(()=>OrderDetails)
     orderDetails: OrderDetails[]
     
}



