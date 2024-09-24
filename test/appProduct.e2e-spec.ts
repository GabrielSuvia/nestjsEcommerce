import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { INestApplication } from "@nestjs/common"
import { Repository } from "typeorm";
import { Products } from "../src/Products/products.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as request from 'supertest';//for usgin the method put and delete

describe('appController',()=>{
let app:INestApplication;
//const mockProduct ={id:'1',name:'celular',price:12,stock:12,description:'nuevoProduct', imgUrl:'thebestprod.com', categoryId:'1',orderDetails:[{}]
let mockRepositoryDb: Partial<Repository<Products>>
const mockProduct = {name:'celular',price:12,stock:12,description:'nuevoProduct', imgUrl:'thebestprod.com'}
const mockProduct2 ={name:'computadora',price:14,stock:10,description:'nuevoProduct22', imgUrl:'thebestprod.com'}
    beforeEach(async ()=>{
       
        mockRepositoryDb = {
        find: jest.fn().mockResolvedValue([{...mockProduct,id:'c0e2e287-e024-4b45-bc8d-34d3e4a9dca4'},
            {...mockProduct2,id:'c0e2e287-e024-4b45-bc8d-34d3e4a9dcb2'}]),
        findOneBy: jest.fn().mockResolvedValue({...mockProduct,id:'c0e2e287-e024-4b45-bc8d-34d3e4a9dca4'}),
        save: jest.fn().mockResolvedValue({...mockProduct2,id:'c0e2e287-e024-4b45-bc8d-34d3e4a9dcb2'}),
        create: jest.fn().mockResolvedValue({...mockProduct}),
        delete: jest.fn().mockResolvedValue({affected:1})

        }
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports:[AppModule],
          providers:[{
            provide:getRepositoryToken(Products),
            useValue:mockRepositoryDb
          }]
            
        }).overrideProvider(getRepositoryToken(Products)).useValue(mockRepositoryDb).compile()

        mockRepositoryDb = moduleFixture.get<Partial<Repository<Products>>>(getRepositoryToken(Products))
        app = moduleFixture.createNestApplication()
        await app.init();
    })


   afterEach(async()=>{
   await app.close();//clos the app in the end of each test
   })

   it('GET it return the pages of Products',async()=>{

     const productPages = await request(app.getHttpServer()).get('/products/pages')
     .query({page:1,limit:2})

        expect(productPages.status).toBe(200)
        expect(productPages.body).toBeInstanceOf(Object)
        console.log('1',productPages.body.productos)
        expect(productPages).not.toBeUndefined()
   })

   it('GET return a list of products',async ()=>{
            
     const product = await request(app.getHttpServer()).get('/products')

     expect(product.status).toBe(200)
     expect(product.body.products).toBeInstanceOf(Array)
     expect(product.body.products).toEqual([{...mockProduct,id:'c0e2e287-e024-4b45-bc8d-34d3e4a9dca4'},
        {...mockProduct2, id:'c0e2e287-e024-4b45-bc8d-34d3e4a9dcb2'}])
    
   })

   it('GET should return a product with its id', async()=>{
    const id='c0e2e287-e024-4b45-bc8d-34d3e4a9dca4'
     const product = await request(app.getHttpServer()).get(`/products/${id}`)
 
     expect(product.status).toBe(200)
     expect(product.body.products).toBeInstanceOf(Object)
     expect(product.body.products).toEqual({...mockProduct,id:id})
   })

   /*
   it('SEEDER should register a list of products ', async ()=>{
   const listProduct = [{name: "HP#320",
    description: "The best computer in the world",
    price: 20.99,
    stock: 10,
    category: "computadora"},{name: "Logitech G502 Pro",
      description: "The best mouse in the world",
      price: 39.99,
      stock: 12,
      category: "mouse"}]
    const response = await request(app.getHttpServer()).post('/products/seeder')
    .send(listProduct)

    expect(response.status).toBe(201)
    expect(response.body.product).toBeInstanceOf(Array)
    console.log('SEEDER',response.body.product)
    response.body.product.map((prod)=>{
      expect(prod).toHaveProperty('id')})

   })*/
 
  it('PUT Should update the product and return a product updated',async()=>{
    const productUpdate = {
      name:'nameUpdate',
      description:'descriptionUpdated'

    }
    const id= 'c0e2e287-e024-4b45-bc8d-34d3e4a9dca4'

   
  const prodUpdate = await request(app.getHttpServer()).put(`/products/${id}`)
  .send(productUpdate)
   expect(prodUpdate.status).toBe(200)
   expect(prodUpdate.body.product).toBeInstanceOf(Object)
   expect(prodUpdate.body.product).toEqual({...mockProduct, id:'c0e2e287-e024-4b45-bc8d-34d3e4a9dca4',name:'nameUpdate',description:'descriptionUpdated'})
   expect(prodUpdate.body.product).not.toBeUndefined()
  })

  it('POST Should create a new product and return the product ',async()=>{
    const newProduct = {
    name:'computadora',
    price:14,
    stock:10,
    description:'nuevoProduct22'
    }  
    
    const product = await request(app.getHttpServer()).post('/products/create')
      .send(newProduct)
    
      console.log('CREATED',product.body)
      //expect(product.status).toBe(201)
      expect(product.body.product).toBeInstanceOf(Object)
      expect(product.body.product).toEqual({...mockProduct2,id:'c0e2e287-e024-4b45-bc8d-34d3e4a9dcb2'})
      expect(product.body.product).not.toBeUndefined()

  })

  it('DELETE should delete a product',async()=>{
    const id= 'c0e2e287-e024-4b45-bc8d-34d3e4a9dca4'
    const response = await request(app.getHttpServer()).delete(`/products/${id}`)
    expect(response.status).toBe(200)
    expect(response.body.products).toBeInstanceOf(Object)
    expect(response.body.products).toEqual({...mockProduct,id:'c0e2e287-e024-4b45-bc8d-34d3e4a9dca4'})
    expect(response.body.products).toHaveProperty('id')
  })

})