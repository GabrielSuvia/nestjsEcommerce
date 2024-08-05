import { Body, Controller,Delete,Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Res, UseGuards} from "@nestjs/common";
import { UserService } from "./users.service";
import { response, Response } from "express";
import { AuthGuard } from "src/Auth/auth.guard";
import { UserCreateDto } from "src/DTOs/createUser.dto";
import { Roles } from "src/decorator/roles.decorator";
import { Role } from "src/decorator/roles.enum";//cambiar todos los src -->a
import { RolesGuard } from "src/Auth/roles.guard";

@Controller('user')
 export class UserControllers{
   constructor(private readonly userService: UserService){}

@Get()
   //@UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.Admin)//definir guarda de roles, despues del authguard, user/admin ---> Ruta protegida 200
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
   throw new HttpException('User Not Found',HttpStatus.NOT_FOUND)
}
}

@Put(':id')
//@UseGuards(AuthGuard,RolesGuard)
 async updateUser(@Res() res:Response, @Param('id',ParseUUIDPipe) id:string, @Body() UserUpdate:Partial<UserCreateDto>):Promise<Response> {
try {
      const user = await this.userService.updateUserService(id,UserUpdate);
       return res.status(200).send(`producto:${user.id} actualizado`)

} catch (error) {
  throw new HttpException('Faild to update User',HttpStatus.BAD_REQUEST);
}
 }

@Delete(':id')
//@UseGuards(AuthGuard)
 async deleteProduct(@Param('id', ParseUUIDPipe) id:string, @Res() res:Response):Promise<Response>{
      try {
        const user = await this.userService.deleteUserService(id);
        return res.status(200).json(`producto:${user.id} eliminado`)
      } catch (error) {
        throw new HttpException('Faild to delete User',HttpStatus.BAD_REQUEST);
      }
   }
 }