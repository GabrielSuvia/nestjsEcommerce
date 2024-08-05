import {Test,TestingModule} from '@nestjs/testing';
import { AuthService } from 'src/Auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateLoginDto } from 'src/DTOs/createLogin.dto';
import { Users } from 'src/Users/users.entity';
import { UserCreateDto } from 'src/DTOs/createUser.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

const mockAuthRepository = ()=> ({
    findOneBy: jest.fn(),
    create: jest.fn(),
    save:jest.fn()
})

const mockJwtService =()=> {
    sign: jest.fn()
}

describe('authService', ()=>{
       let userRepository;
       let jwtService;
        let authService:AuthService;

        beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[AuthService,
                {provide: getRepositoryToken(Users), useFactory: mockAuthRepository},
                {provide: JwtService, useFactory: mockJwtService },
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
        jwtService  = module.get<JwtService>(JwtService);
        userRepository = module.get(getRepositoryToken(Users));

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

        describe('authSignin', () => {
            it('debería lanzar un error si el usuario no se encuentra', async () => {
              userRepository.findOneBy.mockResolvedValue(null);
        
              await expect(authService.authSignin('test@test.com', 'password')).rejects.toThrow(BadRequestException);
            });
        
            it('debería lanzar un error si la contraseña es incorrecta', async () => {
              const mockUser = { id: '1', email: 'test@test.com', password: 'hashedPassword' };
              userRepository.findOneBy.mockResolvedValue(mockUser);
              bcrypt.compare = jest.fn().mockResolvedValue(false);
        
              await expect(authService.authSignin('test@test.com', 'password')).rejects.toThrow(BadRequestException);
            });
        
            it('debería retornar un token si las credenciales son correctas', async () => {
              const mockUser = { id: '1', email: 'test@test.com', password: 'hashedPassword', isAdmin: true };
              userRepository.findOneBy.mockResolvedValue(mockUser);
              bcrypt.compare = jest.fn().mockResolvedValue(true);
              jwtService.sign.mockReturnValue('token');
        
              const result = await authService.authSignin('test@test.com', 'password');
              expect(result).toEqual({ succes: 'user logging in succesfully', token: 'token' });
            });
          });
        
          describe('signupService', () => {
            it('debería lanzar un error si las contraseñas no coinciden', async () => {
        
              await expect(authService.signupService(userMock)).rejects.toThrow(BadRequestException);
            });
        
            it('debería lanzar un error si la contraseña no se puede encriptar', async () => {
              bcrypt.hash = jest.fn().mockResolvedValue(null);
        
              await expect(authService.signupService(userMock)).rejects.toThrow(BadRequestException);
            });
        
            it('debería crear y retornar el usuario sin la contraseña', async () => {
              const mockUser: Partial<UserCreateDto> = { email: 'test@test.com', password: 'password' };
              const hashedPassword = 'hashedPassword';
              bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);
              userRepository.create.mockReturnValue({ ...mockUser, password: hashedPassword });
              userRepository.save.mockResolvedValue({ ...mockUser, password: hashedPassword });
        
              const result = await authService.signupService(mockUser);
              expect(result).toEqual({ email: 'test@test.com' });
              expect(userRepository.create).toHaveBeenCalledWith({ ...mockUser, password: hashedPassword });
              expect(userRepository.save).toHaveBeenCalled();
            });
          });
        });


