import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../Users/users.entity";
import { Repository } from "typeorm/repository/Repository";
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from "../DTOs/createUser.dto";
import {JwtService } from "@nestjs/jwt";
import { Role } from "../decorator/roles.enum";

@Injectable()
export class AuthService{
    
constructor(@InjectRepository(Users) private readonly userRepository:Repository<Users>,
               private readonly jtwService: JwtService){
   }
   
async getAuthService(){
          let usersLogin = await this.userRepository.find();

         let userLogin = usersLogin.map((user)=>{
            const {email,password} = user;
            return {email,password};
          })
          return userLogin ;//PromiseAll
   }
   
async authSignin(email:string, Password:string): Promise<any | null>{
        const user = await this.userRepository.findOneBy({email});
      
      if(!user){
        throw new BadRequestException('email or password incorrect');
      };
      //encriptacion validate
     const validatePassword = await bcrypt.compare(Password, user.password );//v or f
     if(validatePassword){
      throw new BadRequestException('User Invalid');
     };
       const userPayLoad = {
         sub:user.id,
         id:user.id,
         email:user.email,
         roles:[user.isAdmin ? Role.Admin : Role.User],
       }
       const token = this.jtwService.sign(userPayLoad);
    
       //  return {succes:'user logging in succesfully',token};//resolver
            return token;
      }
    
async signupService(user: Partial<UserCreateDto>){
          
            const passwordCompare = user.password === user.confirPassword?true : false;

             if(!passwordCompare){
                throw new BadRequestException('email or password  incorrect');
             };

             const bcryptHashedPassword = await bcrypt.hash(user.password,2);
             if(!bcryptHashedPassword){

                throw new BadRequestException('the password is not hashed')
             };
             const {confirPassword,...newUse} = user
                const newUser = await this.userRepository.create({...newUse,password:bcryptHashedPassword})//orden
             
             const  NewUser = await this.userRepository.save(newUser);
             
          //   console.log(NewUser)
             return NewUser;
    }
}