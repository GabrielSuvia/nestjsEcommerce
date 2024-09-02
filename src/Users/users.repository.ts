import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { UserCreateDto } from "src/DTOs/createUser.dto";

@Injectable()
export class UserRepository{
   constructor(@InjectRepository(Users) private userRepositoryDB: Repository<Users>){
   }
   private prueba = [{
      "email":"jose123@hotmail.com",
      "name": "jose",
      "password": "Josue321",
      "confirPassword":"Josu23123",
      "address": "Avenida nueva vida",
      "phone":"7897689",
      "country":"bolivia",
      "city":"santa cruz"
  }
   ]
    
 async getUsers(): Promise<Partial<Partial<Users>[]>>{
   const users = await this.userRepositoryDB.find({relations: {orderId:true}})

   const userWithoutIsadmin = users.map((user)=>{

    const { isAdmin,...use} = user

    return use
   })
   return userWithoutIsadmin;
 }
  
async getUser(id:string): Promise<Partial<Users>>{

   const user = await this.userRepositoryDB.findOneBy({id})
         
   if(!user){
      throw new Error("error");
   };
  const {password, ...userWithoutPassword} = user;

     return userWithoutPassword;
}

 async getUserPage(page:number,limit:number){
    const start = (page-1)*limit;
    const end = start + limit;
console.log('userrepository', start,end)
const Users = await this.userRepositoryDB.find()
    const usersPage = Users.slice(start,end)
    console.log(usersPage)
    
    return usersPage
}

async createUserRepository(User: Partial<UserCreateDto>): Promise<Omit<Users,'password'>>{

      const user = await this.userRepositoryDB.create(User);//?????
                   await this.userRepositoryDB.save(user);
       const {password, ...withoutPassword} = user;

       return withoutPassword;
}

async updateUserRepository(id:string, userUpdate:Partial<UserCreateDto>): Promise<Users>{
      const user = await this.userRepositoryDB.findOneBy({id});
      if(!user){
    throw new Error('User Not Found');
      }
      Object.assign(user, userUpdate);//actualiza las propiedades del usuario
      const userSave = await this.userRepositoryDB.save(user);
      return  userSave;
}

async deleteUserRepository(id:string): Promise<Partial<Users>>{
   const User = await this.userRepositoryDB.findOneBy({id})
     const userDelete = await this.userRepositoryDB.delete(id)

     if(userDelete.affected === 0){//Numeros de afectados
      throw new Error('Not Found User')
     };
     return User;

}}