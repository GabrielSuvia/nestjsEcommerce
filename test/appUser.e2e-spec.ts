import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';//for usgin the method put and delete
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../src/Users/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../src/decorator/roles.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository:Partial<Repository<Users>>
  let jwtService:Partial<JwtService> = {
    sign: jest.fn().mockResolvedValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYjc2YzYwZi1lZjZiLTRjZmItYWM5ZS1mNWEwMWU3YmE5YjkiLCJpZCI6IjBiNzZjNjBmLWVmNmItNGNmYi1hYzllLWY1YTAxZTdiYTliOSIsImVtYWlsIjoiczNAaG90bWFpbC5jb20iLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcyNzE3Mjg4NywiZXhwIjoxNzI3MTc2NDg3fQ._cxNqHKv0uAFe046z-ilzkbi_LA5DQCBKIKy16B9wXU')
  }
 
  const user = {email:"s3@hotmail.com",name: "sdasd",password: "sd",
    confirPassword:"sd",address: "Avsaeni",phone:1783434,country:"boliviaa",city:"santa cruz",}

  beforeEach(async () => {
    const mockRepositoryDb = {
      find: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({...user,isAdmin:false}),
      save: jest.fn().mockResolvedValue({...user,id:'0b76c60f-ef6b-4cfb-ac9e-f5a01e7ba9b9',isAdmin:false}),
      delete: jest.fn().mockResolvedValue({affected:1}),
      findOneBy: jest.fn().mockResolvedValue({...user,id:'0b76c60f-ef6b-4cfb-ac9e-f5a01e7ba9b9',isAdmin:false})
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers:[{provide:JwtService,
        useValue:jwtService
      },{
        provide:getRepositoryToken(Users),
        useValue:mockRepositoryDb
      }]
    }).overrideProvider(getRepositoryToken(Users)).useValue(mockRepositoryDb).compile();
   

    userRepository = moduleFixture.get<Partial<Repository<Users>>>(getRepositoryToken(Users))
    jwtService = moduleFixture.get<JwtService>(JwtService)
    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await app.close(); // Cerrar la aplicación al final de cada prueba
  });

  it('GET / Return an array of users', async() => {
   const req = await request(app.getHttpServer()).get('/user')
       console.log(req.body)

      expect(req.status).toBe(200)
      expect(req.body).toBeInstanceOf(Object)
  });

  it('GET / Return an object user', async() => {
    const req = await request(app.getHttpServer()).get('/user/0b76c60f-ef6b-4cfb-ac9e-f5a01e7ba9b9')
        console.log(req.body)
       expect(req.status).toBe(200)
       expect(req.body).toBeInstanceOf(Object)
   });

   it('GET not found exception, when the user does not exist',async()=>{
    const req = await request(app.getHttpServer()).get('/user/085a59e3-3f8b-4a0b-86b1-66607970105')
    console.log(req.body)

    expect(req.status).toBe(400)
    expect(req.body.message).toBe('Validation failed (uuid is expected)')
   })

   it('POST /auth/signup return an user created ', async()=>{
   
    const req = await request(app.getHttpServer()).post('/auth/signup').send(user)

     expect(req.status).toBe(200)
     expect(req.body).toBeInstanceOf(Object)

     const users = await userRepository.find?.();
     expect(users).toEqual([])
   })

   it('GET /user/query show the users like pages', async()=>{
     const req = await request(app.getHttpServer()).get('/user/query')
     .query({page:1, limit:5})

     expect(req.status).toBe(200)
     expect(req.body).toEqual({users:[]})//objeto return

   })
   
   it('PUT user/:id delete the data of user', async()=>{
    const UserUpdate = {
      "email": 'update12@hotmail.com',
      "name":'updatericardo12'
    }
 
  const userId = '0b76c60f-ef6b-4cfb-ac9e-f5a01e7ba9b9'

  const req = await request(app.getHttpServer())
    .put(`/user/${userId}`)
    .send(UserUpdate)   
    console.log("REQ:", req.body)
    
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Object)
  
   })

   it('DELETE user/:id delete the data of user', async()=>{
    const userId = '0b76c60f-ef6b-4cfb-ac9e-f5a01e7ba9b9' 

    const req = await request(app.getHttpServer())
    .delete(`/user/${userId}`)

    expect(req.status).toBe(200)
    expect(req.body.user).toBeInstanceOf(Object)
    expect(req.body.user).toEqual({...user,id:'0b76c60f-ef6b-4cfb-ac9e-f5a01e7ba9b9',isAdmin:false})
    expect(req.body.user).not.toBeUndefined()
   })  

   it('Post auth/signin should login to the user',async ()=>{
    const userLogin = {
      email:user.email,
      password:user.password
    }
  
    const payload = {
      sub:'0b76c60f-ef6b-4cfb-ac9e-f5a01e7ba9b9',
      id:'0b76c60f-ef6b-4cfb-ac9e-f5a01e7ba9b9',
      email: userLogin.email,
      roles:[false? Role.Admin:Role.User]

    }

const req = await request(app.getHttpServer()).post(`/auth/signin`)   
        .send(userLogin)
        const token = jwtService.sign(payload)
      console.log('IT ',req.body.user)
      expect(req.status).toBe(200)
      expect(req.body.user).toEqual(token)
      expect(req.body.user).not.toBeUndefined()
        
   })

});
