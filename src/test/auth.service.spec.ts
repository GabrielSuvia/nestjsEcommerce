import {Test,TestingModule} from '@nestjs/testing';
import { AuthService } from 'src/Auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateLoginDto } from 'src/DTOs/createLogin.dto';
import { Users } from 'src/Users/users.entity';
import { UserCreateDto } from 'src/DTOs/createUser.dto';


const mockAuthRepository = ()=> ({
    authSignin: jest.fn(),
    signupService: jest.fn()
})

describe('authService', ()=>{
   
        let authService;
        beforeEach(async ()=>{
        const module= await Test.createTestingModule({
            providers:[AuthService,JwtService,
                {provide: AuthService, useValue: mockAuthRepository},
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService)

        })

        const userMock:Partial<UserCreateDto> = {
            email:'jose@hotmail.com',
            name:'joseRodriguez',
           password: 'heloo123',
           confirPassword:'heloo123',
          address:'doble via la guardia',
          phone:65465786,
          country:'Bolivia',
          city:'Santa cruz',
          isAdmin:false,
        }

    it('the Authservice should be defined',()=>{
        expect(authService).toBeDefined();
    })


    it('we wait to register an user',async ()=>{
        authService.signupService.mockResolvedValue(userMock);

        const result = authService.signupService(userMock,userMock.confirPassword);
        expect(result.passwordConfir).not.toEqual(userMock.password);
        expect(authService.signupService).toHaveBeenCalledWith(userMock,userMock.confirPassword);})


    it('we wait to return a token for the user on the login',()=>{

     authService.authSignin.mockAuthRepository(userMock.email, userMock.password);

     const result = authService.authSignin(userMock.email, userMock.password);
     expect(result).toEqual(userMock)

    })

    
      
})




