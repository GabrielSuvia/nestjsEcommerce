import { Test, TestingModule } from "@nestjs/testing"
import { CategoriesRespository } from "../Categories/categories.repository"
import { CategorieService } from "../Categories/categories.service"


describe('', ()=>{
let categoriesService: CategorieService;
let categoriesRespository: Partial<CategoriesRespository>
    beforeEach(async()=>{
      categoriesRespository = {
           getCategories: jest.fn().mockResolvedValue([{name:'namecategory',id:'1'}]),
           addCategories: jest.fn().mockResolvedValue([{name:'nuevaCatgeory', id:'2'}])
     }

const module: TestingModule = await Test.createTestingModule({
    providers:[CategorieService,{
        provide:CategoriesRespository,
        useValue:categoriesRespository
    }]
}).compile()

    categoriesRespository = module.get<CategoriesRespository>(CategoriesRespository)
    categoriesService = module.get<CategorieService>(CategorieService)

    })

    it('The categoriesService should be defined',async ()=>{
       expect(categoriesService).toBeDefined()
    })

    it('GET should be get all categories of the database  ', async ()=>{
          const categories = await categoriesService.getCategoriesService()
          expect(categories).toBeInstanceOf(Array)
          expect(categories).toEqual([{name:'namecategory',id:'1'}])
          categories.map((cat)=>{
               expect(cat).toHaveProperty('id')
          })

    })

    it('Add a list of categories to the database',async()=>{
        const newCategory = [{
            name:"nuevaCatgeory",
            description:"Category",
            price:23,
            stock:12, 
            category:"celulares"
        }]
          const category = await categoriesService.addCategorieService(newCategory)
          console.log(category)
          expect(category).toBeInstanceOf(Array)
          expect(category.length).toBeGreaterThan(0)
         category.map((cat)=>{
            expect(cat).toHaveProperty('id')
          })
          expect(category).not.toBeUndefined()
         
    })
})