import {Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { UserCreateDto } from "src/DTOs/createUser.dto";
import { Users } from "./users.entity";

@Injectable()
export class UserService{
constructor(private readonly userRepository:UserRepository){}

   async getUsers(): Promise<Partial<Users[]>>{
    const users = await this.userRepository.getUsers();
        return users;
    }
   
   async getUser(id:string){
    const user = await this.userRepository.getUser(id)
    console.log("Consiguiendo usuarios",user)
    return user;
   }

   async getUserPage(page:number, limit:number){
      const users =  this.userRepository.getUserPage(page,limit);
      return users;
   }

   async createUserService(User:Partial<UserCreateDto>): Promise<Partial<UserCreateDto>>{
    const newUser = await this.userRepository.createUserRepository(User)
    return newUser;
   }
   
   async updateUserService(id:string,userUpdate:Partial<UserCreateDto>){//??????
    const user = await this.userRepository.updateUserRepository(id, userUpdate)
    return user;
   }

   async deleteUserService(id:string): Promise<Partial<Users>>{
      const userDelete = await this.userRepository.deleteUserRepository(id);
      
      return userDelete;
   }


}