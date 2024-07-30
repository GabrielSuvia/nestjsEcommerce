import { IsArray, IsDate, IsNotEmpty, IsObject, IsUUID } from 'class-validator';
import { Products } from 'src/Products/products.entity';



export class OrderCreateDto{
    
       @IsUUID()
       @IsNotEmpty()
        user_id:string
    
       @IsDate()
       @IsNotEmpty()
        date:Date
    
        @IsArray()
        @IsNotEmpty()
        products:Products[]
    
}