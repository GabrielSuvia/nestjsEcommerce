import { Injectable} from "@nestjs/common";
import { Iuser } from "./users.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { UserCreateDto } from "src/DTOs/createUser.dto";

@Injectable()
export class UserRepository{
   constructor(@InjectRepository(Users) private userRepositoryDB: Repository<Users>){
   }
   private prueba = [{
    id:1,
    email:"jose@hotmail.com",
    name: "jose",
    password: "Josue321",
    address: "Avenida nueva vida",
    phone:"7897689",
    country:"bolivia",
    city:"santa cruz"
    
},{
   id:2,
   email:"maria@hotmail.com",
   name: "maria",
   password: "Maria321",
   address: "Avenida nueva vida",
   phone:"7897689",
   country:"bolivia",
   city:"santa cruz"
   
},{
   id:3,
   email:"rodrigo@hotmail.com",
   name: "rodrigo",
   password: "Rodrigo321",
   address: "Avenida nueva vida",
   phone:"7897689",
   country:"bolivia",
   city:"santa cruz"
},{
   id:4,
   email:"sandi343@hotmail.com",
   name: "sandi2",
   password: "Sandi321",
   address: "Avenida nueva vida",
   phone:"7897689",
   country:"bolivia",
   city:"santa cruz"
   
},{
   id:5,
   email:"eduardo3214@hotmail.com",
   name: "eduardo",
   password: "eduardo231",
   address: "Avenida nueva vida",
   phone:"7897689",
   country:"bolivia",
   city:"santa cruz"
   
},{
   id:6,
   email:"milton34@hotmail.com",
   name: "milton",
   password: "milton321",
   address: "Avenida nueva vida",
   phone:"7897689",
   country:"bolivia",
   city:"santa cruz"
   
},{
   id:7,
   email:"mario324@hotmail.com",
   name: "mario21",
   password: "mario213",
   address: "Avenida nueva vida",
   phone:"7897689",
   country:"bolivia",
   city:"santa cruz"
   
}
    ]
 async getUsers(): Promise<Partial<Users[]>>{
   const users = await this.userRepositoryDB.find()
   return users;

 }
  
async getUser(id:string): Promise<Partial<Users>>{

   const user = await this.userRepositoryDB.findOneBy({id})
         
   if(!user){
      throw new Error("error");
   };
  const {password, ...userWithoutPassword} = user;
  await this.userRepositoryDB.findOne({where:{id}, relations:['orderId']})

     return userWithoutPassword;
}

 getUserPage(page:number,limit:number){
    const start = (page-1)*limit;
    const end = start + + limit;

    const usersPage = this.prueba.slice(start,end)
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
     const userDelete = await this.userRepositoryDB.delete(id)

     if(userDelete.affected === 0){//Numeros de afectados
      throw new Error('Not Found User')
     };
     const User = await this.userRepositoryDB.findOneBy({id})
     return User;

}
}