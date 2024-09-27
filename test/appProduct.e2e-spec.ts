import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { INestApplication } from "@nestjs/common"
import { Repository } from "typeorm";
import { Products } from "../src/Products/products.entity";
import * as request from 'supertest';//for usgin the method put and delete

describe('appController',()=>{
let app:INestApplication;
let mockRepositoryDb: Partial<Repository<Products>>

    beforeEach(async ()=>{
   
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports:[AppModule],
          providers:[]
            
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init();
    })


   afterEach(async()=>{
   await app.close();//clos the app in the end of each test
   })

   it('GET it return the pages of Products',async()=>{

     const req = await request(app.getHttpServer()).get('/products/pages')
     .query({page:1,limit:2})

        expect(req.status).toBe(200)
        expect(req.body).toBeInstanceOf(Object)
        console.log('1',req.body.productos)
        expect(req).not.toBeUndefined()
   })

   it('GET return a list of products',async ()=>{
            
     const req = await request(app.getHttpServer()).get('/products')

     expect(req.status).toBe(200)
     expect(req.body.products).toBeInstanceOf(Array)
    expect(req.body).not.toBeUndefined()
    expect(req.body.products.length).toBeGreaterThan(0)
   })

   it('GET should return a product with its id', async()=>{
    const id='3b676224-bcb0-4664-9840-336437c28ecf'
     const req = await request(app.getHttpServer()).get(`/products/${id}`)
 
     expect(req.status).toBe(200)
     expect(req.body.products).toBeInstanceOf(Object)
     expect(req.body.products).not.toBeUndefined()
     expect(req.body.products).toHaveProperty('id')
   })

   it('SEEDER should register a list of products ', async ()=>{
   const listProduct = [{name: "gdfaas1sHP#32f0",
    description: "The best computer in the world",
    price: 20.99,
    stock: 20,
    category: "keyboard"},{name: "ha2fdgssdfLogitech G502 Pro",
      description: "The best mouse in the world",
      price: 39.99,
      stock: 20,
      category: "mouse"}]
    const response = await request(app.getHttpServer()).post('/products/seeder')
    .send(listProduct)

    expect(response.status).toBe(201)
    expect(response.body.product).toBeInstanceOf(Array)

   })

  it('PUT Should update the product and return a product updated',async()=>{
    const productUpdate = {
      name:'nameUpdate12',
      description:'descriptionUpdated12'

    }
  const id= '3b676224-bcb0-4664-9840-336437c28ecf'
  const req = await request(app.getHttpServer()).put(`/products/${id}`)
  .send(productUpdate)
   expect(req.status).toBe(200)
   expect(req.body.product).toBeInstanceOf(Object)
   expect(req.body.product).not.toBeUndefined()
  })

  it('POST Should create a new product and return the product ',async()=>{
    const newProduct = {
    name:'computadoraqzas1',
    price:17,
    stock:15,
    description:'nuevoProdasuct1w'
    }  
    
    const req = await request(app.getHttpServer()).post('/products/create')
      .send(newProduct)
      expect(req.status).toBe(201)
      expect(req.body.product).toBeInstanceOf(Object)
      expect(req.body.product).not.toBeUndefined()
      expect(req.body.product).toHaveProperty('id')

  })

  it('DELETE should delete a product',async()=>{
    const id= '3b676224-bcb0-4664-9840-336437c28ecf'
    const req = await request(app.getHttpServer()).delete(`/products/${id}`)
    expect(req.status).toBe(200)
    expect(req.body.products).toBeInstanceOf(Object)
    expect(req.body.products).toHaveProperty('id')
    expect(req.body.products).not.toBeUndefined()
  })

})