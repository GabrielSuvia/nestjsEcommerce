//implementan en /auth/signin
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateLoginDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description:'this is an example of this field',
        example:'Bartolomiau321@hotmail.com'
    })
    email: string

    @IsNotEmpty()
    password:string
}