//implementan en /auth/signin
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'


export class CreateLoginDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password:string
}