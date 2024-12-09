import { Body, Controller,Delete,Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Put, Query, Res, UseGuards} from "@nestjs/common";
import { UserService } from "./users.service";
import { Response } from "express";//cambiar todos los src -->a
//import { AuthGuard } from "Auth/auth.guard";
//import { Roles } from "decorator/roles.decorator";
//import { RolesGuard } from "Auth/roles.guard";
//import { Role } from "decorator/roles.enum";
import { UserCreateDto } from "../DTOs/createUser.dto";

@Controller('user')
 export class UserControllers{
   constructor(private readonly userService: UserService){}

@Get()
  //@UseGuards(AuthGuard, RolesGuard)
 //@Roles(Role.Admin)//definir guarda de roles, despues del authguard, user/admin ---> Ruta protegida 200
   async getUsers(@Res() res:Response):Promise<Response>{
    try{
      const users = await this.userService.getUsers();
      return res.status(200).json({users})
    }catch(error){

   throw new HttpException('Failed to get users', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
   } 

@Get('query')
  // @UseGuards(AuthGuard)
   async getPage(@Res() res:Response, @Query('page') page:string, @Query('limit') limit:string):Promise<Response>{
try{ if(page && limit){
      const users = await this.userService.getUserPage(Number(page),Number(limit))
      return res.status(200).json({users})
    }else{
      const users = await this.userService.getUserPage(1,5)
      console.log(users)
      return res.status(200).json({users})
    }
  }catch(error){
         throw new HttpException('Failed to get users with pagination', HttpStatus.INTERNAL_SERVER_ERROR)
    };
   }

@Get(':id')
//@UseGuards(AuthGuard,RolesGuard)
// @Roles(Role.Admin)//verificate token if it is an admin or user
async getUser(@Param('id', ParseUUIDPipe) id:string, @Res() res:Response):Promise<Response>{
try {
   const user = await this.userService.getUser(id);
    return res.status(200).json({user})
} catch (error) {
  // throw new HttpException('User Not Found',HttpStatus.NOT_FOUND)
  return res.status(404).json({message:'usuario no encontrado', status:404})
}
}

@Put(':id')
//@UseGuards(AuthGuard,RolesGuard)
 async updateUser(@Res() res:Response, @Param('id',ParseUUIDPipe) id:string, @Body() UserUpdate:Partial<UserCreateDto>):Promise<Response> {
try {
      const user = await this.userService.updateUserService(id,UserUpdate);
       return res.status(200).send({user})
} catch (error) {
  throw new HttpException('Faild to update User',HttpStatus.BAD_REQUEST);
}
 }

@Delete(':id')
//@UseGuards(AuthGuard)
 async deleteProduct(@Param('id', ParseUUIDPipe) id:string, @Res() res:Response):Promise<Response>{
      try {
        const user = await this.userService.deleteUserService(id);
        return res.status(200).json({user})
      } catch (error) {
        throw new HttpException('Faild to delete User',HttpStatus.BAD_REQUEST);
      }
   }
 }