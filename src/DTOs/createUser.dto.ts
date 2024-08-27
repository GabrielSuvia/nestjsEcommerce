import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import{IsString, IsNotEmpty, IsEmail, IsArray, ValidateNested, MinLength, MaxLength, Matches, IsPhoneNumber, IsBoolean, IsDate} from 'class-validator';
import { Orders } from 'src/Order/orders.entity';

export class UserCreateDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        { message: 'Password too weak' })
    password: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(15)
    confirPassword:string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @IsPhoneNumber(null)
    @IsNotEmpty()
    @ApiProperty({
        example:7678678
    })
    phone: number

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    country: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    city:string
    
    @IsDate()
    date: Date
    
    @Exclude()
    @IsBoolean()
    isAdmin:boolean

   @IsArray()
   @ValidateNested({each:true})
   @Type(()=>Orders)
    orderId: Orders[]

}