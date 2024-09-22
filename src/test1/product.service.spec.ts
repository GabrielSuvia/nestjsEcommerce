import { Test, TestingModule } from "@nestjs/testing"
import { ProductsRepository } from "../Products/products.repository"
import { ProductService } from "../Products/products.service"
import { ProductsDto } from "DTOs/createProduct.dto"


describe('',()=>{
const mockProduct = {name: "SteelSeries Rival 3",
    description: "The best mouse in the world",
    price: 29.99,
    stock: 12}
let productService:ProductService;
let productRepository:Partial<ProductsRepository>;

    beforeEach(async()=>{
        productRepository = {
            getProduct: jest.fn().mockResolvedValue({...mockProduct,id:'fa4a',imgUrl: "prod.com",
                category: "celular",
                categoryId: "1",
                orderDetails: []}),
            getProducts: jest.fn().mockResolvedValue([{...mockProduct,id:'fa4a',imgUrl: "prod.com",
                category: "celular",
                categoryId: "1",
                orderDetails: []}]),
            createSeederRepository: jest.fn().mockResolvedValue([{...mockProduct,id:'fa4a',imgUrl: "prod.com",
                category: "celular",
                categoryId: "1",
                orderDetails: []}]),
            createRepository: jest.fn().mockResolvedValue({...mockProduct,imgUrl: "prod.com",id:'fa4a',
                category: "celular",
                categoryId: "1",
                orderDetails: []}),
            updateRepository:jest.fn().mockResolvedValue({...mockProduct,id:'fa4a',imgUrl: "update.com",
                category: "celular",
                categoryId: "12",
                orderDetails: []}),
            deleteRepository: jest.fn().mockResolvedValue({affected:1})
        }


       const module: TestingModule = await Test.createTestingModule({
        providers:[ProductService,{
            provide:ProductsRepository,
            useValue:productRepository
        }]
       }).compile()

       productService = module.get<ProductService>(ProductService)
       productRepository = module.get<ProductsRepository>(ProductsRepository)

    })

    it('the productService should be defined',async ()=>{
    expect(productService).toBeDefined()
    })

    it('GET the list of product', async()=>{
    const productList = await productService.getProductsService()
     expect(productList).toBeInstanceOf(Array)
     expect(productList.length).toBeGreaterThan(0)
     expect(productList).toEqual([{...mockProduct,id:'fa4a',imgUrl: "prod.com",
        category: "celular",
        categoryId: "1",
        orderDetails: []}])
     expect(productList).not.toBeNull()

    })

    it('GET the list of product', async()=>{
        const id = 'fa4a'
        const product = await productService.getProductService(id)
         expect(product).toBeInstanceOf(Object)
         expect(product).toEqual({...mockProduct,id:'fa4a',imgUrl: "prod.com",
            category: "celular",
            categoryId: "1",
            orderDetails: []})
         expect(product).not.toBeNull()
         expect(product).toHaveProperty('id')
    
        })
    
    it('seederProduct for up the list of product',async()=>{//Dto me oblig a usar todo
      const seederProduct = await productService.createSeederProductService([{
          ...mockProduct,
          imgUrl: "prod.com",
          category: "celular",
          categoryId: "1",
          orderDetails: []
      }])
      expect(seederProduct).toBeInstanceOf(Array)
      expect(seederProduct.length).toBeGreaterThan(0)
      expect(seederProduct).toEqual([{ ...mockProduct,
        imgUrl: "prod.com",
        category: "celular",
        categoryId: "1",
        id:'fa4a',
        orderDetails: []}])
      expect(seederProduct).not.toBeUndefined()

    })

    it('CREATE a product', async()=>{
     const product = await productService.createProductService({
         ...mockProduct,
         imgUrl: "prod.com",
         category: "celular",
         categoryId: "1",
         orderDetails: []
     })
     expect(product).toBeInstanceOf(Object)
     expect(product).toHaveProperty('id')
     expect(product).toEqual({...mockProduct,id:'fa4a',
        imgUrl: "prod.com",
        category: "celular",
        categoryId: "1",
        orderDetails: []})
    expect(product).not.toBeUndefined()
    })

    it('UPDATE a product into the database', async()=>{
        const id='fa4a'
        const productUpdate = {
            imgUrl: "update.com",
            category: "celular",
            categoryId: "12"}
      const productGet= await productService.updateProductService(id,productUpdate)
      expect(productGet).toBeInstanceOf(Object)
      expect(productGet).toEqual({...mockProduct,id:'fa4a',
        imgUrl: "update.com",
        category: "celular",
        categoryId: "12",
        orderDetails: []})
      expect(productGet).not.toBeUndefined()


    })

    it('DELETE a product of the db', async()=>{
       const id = 'fa4a'
       const deleteProd = await productService.deleteProductService(id)
      expect(deleteProd).toBeInstanceOf(Object)
      expect(deleteProd).toEqual({affected:1})
      expect(deleteProd).not.toEqual({affected:0})
      expect(deleteProd).not.toBeUndefined()

    })
})