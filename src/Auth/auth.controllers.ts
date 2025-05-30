import { Body, Controller,Get, HttpCode, HttpException, HttpStatus, Post,Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { AuthGuard } from "./auth.guard";
import { CreateLoginDto } from "../DTOs/createLogin.dto";
import { UserCreateDto } from "../DTOs/createUser.dto";

@Controller('auth')
export class AuthControllers{
    constructor(private readonly authService:AuthService){}

//Get --Auth.
@Get()
async getAllAuthControllers(@Res() res:Response){
  try {
    const userLogin = await this.authService.getAuthService();
    return res.status(200).json({message: "User registered", login:userLogin});
  } catch (error) {
    throw HttpCode(401);
  }
         
}

@Post('signin')//signup
async authUserLogin(@Res() res:Response, @Body() userLogin:CreateLoginDto  ){
try {
  const userLog = await this.authService.authSignin(userLogin.email, userLogin.password);
  if(userLog){
    return res.status(200).json({ message: 'User Logged in successfully', user: userLog }); //No devuelve el usuario
  };
} catch (error) {
  throw new Error(error);
}}

@Post('signup')
  async signup(@Body() user:UserCreateDto , @Res() res:Response){
    try {
      const User = await this.authService.signupService(user);
      return res.status(201).json({message:'User created', user:User})
    } catch (error) {
      throw new HttpException('Invalid user',HttpStatus.BAD_REQUEST);
    }
   }
}