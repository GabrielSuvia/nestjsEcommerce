import { OrderRepository } from "../Order/orders.repository"
import { OrderService } from "../Order/orders.service"
import { Test, TestingModule } from "@nestjs/testing"



describe('OrderService', ()=>{
let orderService: OrderService
let orderRepository: Partial<OrderRepository>

beforeEach(async()=>{
   orderRepository={
    getOrderRepository: jest.fn().mockResolvedValue({date:'10/03/2024', id:'1'}),
    addOrderRepository: jest.fn().mockResolvedValue({user_id:'1',date:'10/03/2024', id:'1', OrderDetails:{id:'1',price:12, order_id:'1',product:['1']}})
   }

const module : TestingModule = await Test.createTestingModule({
    providers:[OrderService,{
       provide: OrderRepository,
       useValue: orderRepository
    }]
}).compile()
     orderRepository = module.get<Partial<OrderRepository>>(OrderRepository)
     orderService = module.get<OrderService>(OrderService)
})

it('the orderService should be defined',async()=>{
   expect(orderService).toBeDefined()
})

it('Should get one order with id in successfully',async ()=>{
    const id = '1'
    const order = await orderService.getOrderService(id)
   expect(order).toBeInstanceOf(Object)
   expect(order).toEqual({date: '10/03/2024',id:'1'})
   expect(order).not.toBeUndefined()
   expect(order).toHaveProperty('id')
})
//a la espera
it('Should add one order in successfull', async()=>{
   const idUser = '1'
   const listOfProduct = ['1']
     const order = await orderService.addOrderService(idUser, listOfProduct)
     expect(order).toBeInstanceOf(Object)
     expect(order).toHaveProperty('id')
     expect(order).not.toBeUndefined()
     expect(order).toEqual({user_id:'1',date:'10/03/2024', id:'1', OrderDetails:{id:'1',price:12, order_id:'1',product:['1']}})
})

})