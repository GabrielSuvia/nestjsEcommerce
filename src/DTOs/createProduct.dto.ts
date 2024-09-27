import { Categories } from "../Categories/categories.entity"
import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { OrderDetails } from "../OrderDetaill/orderDetails.entity"

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

   @IsOptional()
   @IsString()
    imgUrl: string

  
   @IsString()
   @IsOptional()
   category:string

    @IsOptional()
    @IsArray()
    //@ValidateNested({each: true}.)
    @Type(()=> Categories)
    categoryid: Categories
   
    @IsOptional()
    @IsArray()
   // @ValidateNested({each:true})
   @Type(()=>OrderDetails)
     orderDetails: OrderDetails[]
     
}



