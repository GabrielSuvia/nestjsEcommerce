import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest"


describe('CategoriesService',()=>{
let app:INestApplication;

beforeEach(async()=>{
const moduleFixture: TestingModule = await Test.createTestingModule({
          imports:[AppModule]
}).compile()
   
    app = moduleFixture.createNestApplication();
    await app.init()
})

afterEach(async ()=>{
  await app.close();
})

it('GET should return all the categories',async()=>{
     const req = await request(app.getHttpServer()).get('/categories')
     expect(req.status).toBe(200)
     expect(req.body).toBeInstanceOf(Object)
     expect(req.body.categories).toBeInstanceOf(Array)
     req.body.categories.map((cat)=>{
    expect(cat).toHaveProperty('id')
     })
     expect(req.body).not.toBeUndefined()

})

it('',async()=>{
const categoriesList = [{
  "name": "Logitech G Pro",
  "description": "The best keyboard in the world",
  "price": 59.99,
  "stock": 12,
  "category": "keyboard24"
},
{
  "name": "Razer Viper",
  "description": "The best mouse in the world",
  "price": 49.99,
  "stock": 12,
  "category": "mouse34"
},]
  const req = await request(app.getHttpServer()).post('/categories/seeded')
  .send(categoriesList)
  expect(req.status).toBe(201)
  expect(req.body.dato).toBeInstanceOf(Array)
  req.body.dato.map((cat)=>{
       expect(cat).toHaveProperty('id')
  })
  expect(req.body).not.toBeUndefined()
})



})