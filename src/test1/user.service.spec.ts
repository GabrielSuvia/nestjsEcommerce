import { Test, TestingModule } from "@nestjs/testing"
import { UserRepository } from "../Users/users.repository"
import { UserService } from "../Users/users.service"

describe('Create an instance of User', ()=>{
  const user={ email:"jose123@hotmail.com",name: "jose", confirPassword:"Josue321" ,password: "Josue321",address: "Avenida nueva vida",
        phone:7897689, country:"bolivia", city:"santa cruz"}

  let userService:UserService;
  let userRepository:Partial<UserRepository>;
  
    beforeEach(async ()=>{
       userRepository = {
            getUsers: jest.fn().mockResolvedValue([{...user,id:'ds32',isAdmin:false}]),
            getUser: jest.fn().mockResolvedValue({...user,id:'ds32',isAdmin:false}),
            getUserPage: jest.fn().mockResolvedValue([{...user,id:'ds32',isAdmin:false},{...user,id:'ds33',isAdmin:false},
                {...user,id:'ds34',isAdmin:false}]),
            createUserRepository: jest.fn().mockResolvedValue({...user,id:'ds32',isAdmin:false}),
            updateUserRepository: jest.fn().mockResolvedValue({...user,id:'ds32',isAdmin:false}),
            deleteUserRepository: jest.fn().mockResolvedValue({affected:1}),
        }

       const module: TestingModule = await Test.createTestingModule({
        providers:[
            UserService,{
                provide: UserRepository,
                useValue:userRepository
            }
        ]
       }).compile();

       userService = module.get<UserService>(UserService);
       userRepository = module.get<UserRepository>(UserRepository);

    })

    it('The userservice should be defined',async ()=>{
         expect(userService).toBeDefined()
    })

    it('GET of list of Users',async()=>{
        const User = await userService.getUsers()
        expect(User).toBeInstanceOf(Array)
       expect(User).toEqual([{...user,id:'ds32',isAdmin:false}])
       expect(User.length).toBeGreaterThan(0);
      
    })

    it('GET of id of User',async()=>{
        const id = 'ds32'
        const User = await userService.getUser(id)
        expect(User).toBeInstanceOf(Object)
       expect(User).toEqual({...user,id:'ds32',isAdmin:false});
       expect(User).toHaveProperty('id')
     
 })
  
   
    it('GET user page', async ()=>{
        const page = 1;
        const limit = 3;
        const userPage = await userService.getUserPage(page,limit)
        expect(userPage).toBeInstanceOf(Array);
        expect(userPage.length).toBeGreaterThan(0);
        userPage.forEach((user)=>{
               expect(user).toHaveProperty('id')
               expect(user).toBeInstanceOf(Object)
        })
    })

    it('Create another user', async()=>{
         const User = await userService.createUserService({...user})
         expect(User).toEqual({...user,id:'ds32',isAdmin:false})
         expect(User).toBeInstanceOf(Object)
         expect(User).toHaveProperty('id')
         expect(User).not.toBeNull()
    })
    
    it('Update the user with param', async()=>{
        const idParam = 'ds32';
        const objectUpdate = {
            email:'update@hotmail.com',
            name:'update123',
            phone:11111
        }
    const userUpdate = await userService.updateUserService(idParam,objectUpdate)

    expect(userUpdate).toBeInstanceOf(Object);
    expect(userUpdate).toEqual({...user,id:'ds32',isAdmin:false})
    expect(userUpdate).not.toBeNull()
    })

    it('Delete the user with param', async()=>{
        const idParam = 'ds32';
        
    const userUpdate = await userService.deleteUserService(idParam)
    expect(userUpdate).toBeInstanceOf(Object);
    expect(userUpdate).toEqual({affected:1})
    expect(userUpdate).toHaveProperty('affected')
    expect(userUpdate).not.toBeNull()

    })

})