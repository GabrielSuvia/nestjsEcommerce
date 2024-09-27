import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';//for usgin the method put and delete
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../src/decorator/roles.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtService:Partial<JwtService>
 const mockUser = {name:'mockUser1112',email:'asd1112@hotmail.com',password:'a12sdf',phone:123, city:'Santa cruz',address:'barrioNuevo', country:'Bolivia'}

  beforeEach(async () => {
   

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers:[]
    }).compile();
   
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
    const req = await request(app.getHttpServer()).get('/user/f2fb2a4a-8294-464b-909f-df119b26979e')//id valido
        console.log(req.body)
       expect(req.status).toBe(200)
       expect(req.body).toBeInstanceOf(Object)
   });

   it('GET not found exception, when the user does not exist',async()=>{
    const req = await request(app.getHttpServer()).get('/user/f256fb2a4a-8294-464b-909f-df119b26979e')
    console.log(req.body)

    expect(req.status).toBe(400)
    expect(req.body.message).toBe('Validation failed (uuid is expected)')
   })

   it('POST /auth/signup return an user created ', async()=>{
   
    const req = await request(app.getHttpServer()).post('/auth/signup').send({...mockUser,confirPassword:'a12sdf'})

     expect(req.status).toBe(201)
     expect(req.body).toBeInstanceOf(Object)
     expect(req.body.user).toHaveProperty('id')
     expect(req.body.user).toEqual({...mockUser,id:req.body.user.id, isAdmin:false, password:req.body.user.password})

   })

   it('GET /user/query show the users like pages', async()=>{
     const req = await request(app.getHttpServer()).get('/user/query')
     .query({page:1, limit:5})

     expect(req.status).toBe(200)
     console.log(req.body.users)
     expect(req.body.users).toBeInstanceOf(Array)//objeto return
     expect(req.body.users.length).toBeGreaterThan(0)

   })

   it('PUT user/:id delete the data of user', async()=>{
    const UserUpdate = {
      "email": 'update12231@hotmail.com',
      "name":'updatericardo12231'
    }
 
  const userId = 'f2fb2a4a-8294-464b-909f-df119b26979e'

  const req = await request(app.getHttpServer())
    .put(`/user/${userId}`)
    .send(UserUpdate)   
    console.log("REQ:", req.body)
    
    expect(req.status).toBe(200)
    //expect(req.body).toBeInstanceOf(Object)
  
   })
  
   it('DELETE user/:id delete the data of user', async()=>{
    const userId = '9c029afe-b74b-4042-9b56-447394b20068' 

    const req = await request(app.getHttpServer())
    .delete(`/user/${userId}`)

    expect(req.status).toBe(200)
    expect(req.body.user).toBeInstanceOf(Object)
    expect(req.body.user).not.toBeUndefined()
   })  

   it('Post auth/signin should login to the user',async ()=>{
    const user = await request(app.getHttpServer()).get('/user')
    const userLogin = {
      email:user.body.users[0].email,
      password:user.body.users[0].password
    }
  

const req = await request(app.getHttpServer()).post(`/auth/signin`)   
        .send(userLogin)
      console.log('IT ',req.body.user)
      expect(req.status).toBe(200)
      expect(req.body.user).not.toBeUndefined()
      expect(typeof req.body.user).toBe('string')
        
   })

});
