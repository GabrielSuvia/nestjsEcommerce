import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../src/Users/users.entity';
import { Repository } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository:Partial<Repository<Users>>
 
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
      providers:[{
        provide:getRepositoryToken(Users),
        useValue:mockRepositoryDb
      }]
    }).overrideProvider(getRepositoryToken(Users)).useValue(mockRepositoryDb).compile();
   

    userRepository = moduleFixture.get<Partial<Repository<Users>>>(getRepositoryToken(Users))
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

   it('POST /auth/signup return an user created ',async()=>{
   
    const req = await request(app.getHttpServer()).post('/auth/signup').send(user)

    console.log(req.body)
     expect(req.status).toBe(200)
     expect(req.body).toBeInstanceOf(Object)

     const users = await userRepository.find?.();
     expect(users).toEqual([])
     console.log(users)
   })

   it('GET /user/query show the users like pages', async()=>{
     const req = await request(app.getHttpServer()).get('/user/query')
     .query({page:1, limit:5})

     expect(req.status).toBe(200)
     expect(req.body).toEqual({users:[]})//objeto return

   })
   
   it('DELETE user/:id delete the data of user', async()=>{
    const UserUpdate = {
      "email": 'update12@hotmail.com',
      "name":'updatericardo12'
    }

 
  const userId = await userRepository.findOneBy({email:user.email}) 

  const req = await request(app.getHttpServer())
    .put(`/user/${userId?.id}`)
    .send(UserUpdate)   
    console.log("REQ:", req.body)
    
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Object)
  
   })

   it('DELETE user/:id update the data of user', async()=>{
    const userId = await userRepository.findOneBy({email:user.email}) 
    if(!userId){
      throw new Error('error')
    }
    console.log('USERID',userId)

    const req = await request(app.getHttpServer())
    .delete(`/user/${userId.id}`)

    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Object)
   })  

});
