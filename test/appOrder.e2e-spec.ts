import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"


describe('appController', ()=>{
    let app:INestApplication;

beforeEach(async()=>{
const moduleFixture:TestingModule = await Test.createTestingModule({
    imports:[AppModule]
}).compile()

      app = moduleFixture.createNestApplication();
      await app.init()
      
})

afterEach(async()=>{
   await app.close();
})

it('GET should be a order with its id',async()=>{
const id = "6a833a87-95e5-4473-965c-56a76c466bdb"
const req = await request(app.getHttpServer()).get(`/orders/${id}`)
console.log(req.body)
expect(req.status).toBe(200)
expect(req.body.order).toBeInstanceOf(Object)
expect(req.body.order).toHaveProperty('id')
expect(req.body.order).not.toBeUndefined()
//expect(req.body.order).toEqual({id:'6a833a87-95e5-4473-965c-56a76c466bdb',date:'2024-09-01T20:06:53.576Z'})
})

it('POST should be create an order and return the order created', async()=>{
   // const userList = await request(app.getHttpServer()).get('/user')
  //  const productsList = await request(app.getHttpServer()).get('/user/productsList')
    const requestOrder = {
        userId:'ad446f77-177d-42ab-bd53-162c87585988',//userList.body.user.[0].id, 
        products:['3b676224-bcb0-4664-9840-336437c28ecf','2efcc229-2e93-40a8-a182-941272eb9817']
    }
  const req = await request(app.getHttpServer()).post('/orders/create').send(requestOrder)
      expect(req.status).toBe(201)
   
})
   


})