import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../Auth/auth.service";
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from "../Users/users.entity";
import * as bcrypt from 'bcrypt';
import { Role } from "../decorator/roles.enum";

describe('create an instance of AuthService', () => {
  let authService: AuthService;
  let userRepository: Partial<Repository<Users>>;
  let jwtService: JwtService;

const hashPassword = "$2b$04$ZzAGhEiaV0qXKq21JOyeN.AtoG/rXcmiNxkQWsEAh5.T/zAc8cK3m"
 const user={ email:"jose123@hotmail.com",name: "jose", confirPassword:"Josue321" ,password: "Josue321",address: "Avenida nueva vida",
  phone:7897689, country:"bolivia", city:"santa cruz"}
const {confirPassword,...userWithoutConfir}= user

  beforeEach(async () => {
    userRepository = {
      find: jest.fn().mockResolvedValue([{...user, isAdmin:false,id:'ds32'}]), // Adjust based on expected data
      findOneBy: jest.fn().mockResolvedValue({...userWithoutConfir,id:'ds32',isAdmin:false, password:hashPassword}),//the only important is to make that return a value
      save: jest.fn().mockResolvedValue({...userWithoutConfir, isAdmin:false,id:'ds32',password:hashPassword}),
      create:jest.fn().mockResolvedValue({...userWithoutConfir,isAdmin:false,password:hashPassword})
    };

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashPassword);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useValue: userRepository
        },{
          provide: JwtService,
          useValue:{sign:jest.fn().mockResolvedValue('MockToken'),
            verify: jest.fn().mockResolvedValue({ userId: 1, username: 'testuser' })
          }
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Partial<Repository<Users>>>(getRepositoryToken(Users));
    jwtService = module.get<JwtService>(JwtService);
  });


it('should be defined', async () => {
  expect(authService).toBeDefined();
});

it('get all Auth',async ()=>{
const result = await authService.getAuthService();
expect(userRepository.find).toHaveBeenCalled();
expect(result).toBeInstanceOf(Array)
expect(result).toEqual([{email:user.email,password:user.password}])  
expect(result).not.toEqual(undefined) 
})

it('signuUp user',async ()=>{
const result = await authService.signupService(user);
const {confirPassword,password,...rest} = user
expect(bcrypt.hash).toHaveBeenCalledWith(password,2)
expect(userRepository.create).toHaveBeenCalledWith({...userWithoutConfir,password:hashPassword})
expect(userRepository.save).toHaveBeenCalledWith({...userWithoutConfir,isAdmin:false,password:hashPassword})
expect(result).not.toEqual({...rest,id:'ds32',isAdmin:false})
expect(result.password).not.toBe(user.password)
expect(result.password).toBe(hashPassword)
})

it('Login of user',async ()=>{
const userPayload = {sub:'ds32',
id:'ds32',
email:user.email,
roles:[false ? Role.Admin : Role.User]};
const token = await jwtService.sign(userPayload)

const result = await authService.authSignin(user.email,user.password)
expect(userRepository.findOneBy).toHaveBeenCalledWith({email:user.email})
expect(bcrypt.compare).toHaveBeenCalledWith(user.password,hashPassword)
expect(jwtService.sign).toHaveBeenCalledWith(userPayload)
expect(result).toBeDefined()
expect(result).toBe(token)
//brcript para comparar
})

});
