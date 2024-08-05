import { Test} from "@nestjs/testing";
import { UserService } from "../Users/users.service";
import { UserRepository } from "../Users/users.repository";


const userMocksRepository = ()=>({
    getUser:jest.fn(),
    getUsers:jest.fn(),
    getUserPage:jest.fn(),
    createUserRepository:jest.fn(),
    updateUserRepository:jest.fn(),
    deleteUserRepository:jest.fn()
});


describe('userService',()=>{
let userService: UserService;
let userRepository;

beforeEach(async ()=>{
    const module = await Test.createTestingModule({
        providers:[UserService,
            {provide: UserRepository, useFactory: userMocksRepository},
        ]
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    }
)

const userMock = {id:'1hjsahdlj2lkdla3lssd',
    email:'Josealberto@hotmail.com',
    name:'josesu123',
    password:'697363894',
    address:'Carretera antigua cochabamba',
    phone:7679,
    country:'Bolivia',
    city:'Santa cruz'};



    it('Devolvera todos los usaurios en un arreglo',async ()=>{
        const userMocks = [userMock]
        userRepository.getUsers.mockResolvedValue(userMocks)
      
       const result = await userService.getUsers();
         expect(result).toEqual(userMocks);
         expect(userRepository.getUsers).toHaveBeenCalled()
    })


    it('Devolvera el usuario por id',async ()=>{
    userRepository.getUser.mockResolvedValue(userMock);
    const result = await userService.getUser(userMock.id);
    expect(result).toEqual(userMock.id);
    expect(userRepository.getUser).toHaveBeenCalledWith(userMock.id)})



    it('Devolvera el paginado de usuario atraves del page y limit',async ()=>{
        const page = 1;
        const limit =1;
        userRepository.getUserPage.mockResolvedValue(page,limit);
    
        const result = await userService.getUserPage(page,limit)
        expect(result.length).toEqual(1);
        expect(userRepository.getUserPage).toHaveBeenCalledWith(page,limit)
    });



    it('Creara un usuario',async ()=>{
      userRepository.createUserRepository.mockResolvedValue(userMock)

      const result = await userService.createUserService(userMock);
      expect(result).toEqual(userMock);
      expect(userRepository.createUserRepository).toHaveBeenCalledWith(userMock)
    })


    it('Actualizara un usuario',async ()=>{
        const id = '1hjsahdlj2lkdla3lssd'
        userRepository.updateUserRepository.mockResolvedValue(id,userMock);
  
        const result = await userService.updateUserService(id,userMock);
        expect(result).toEqual(userMock);
        expect(userRepository.updateUserRepository).toHaveBeenCalledWith(id,userMock)
    })


    it('Eliminara un usuario',async ()=>{
        const id = '1hjsahdlj2lkdla3lssd';
        userRepository.updateUserRepository.mockResolvedValue(id);
        const arRepository = [userMock]

        const result = await userService.deleteUserService(id);
        expect(result).toEqual(userMock);
        expect(result).toBe(arRepository.length-1)
        expect(userRepository.deleteUserRepository).toHaveBeenCalledWith(id)
    });

});