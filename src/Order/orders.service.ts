import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./orders.repository";
import { Orders } from "./orders.entity";

@Injectable()
export class OrderService{
constructor(private readonly orderRepository:OrderRepository){}
    
   async getOrdersService(): Promise<Partial<Orders[]>>{
       const orders = await this.orderRepository.getOrdersRepository();
    return orders
   }

   async getOrderService(id:string): Promise<Partial<Orders>>{
          const order = await this.orderRepository.getOrderRepository(id)
          return order;
    }

   async addOrderService(userId:string, products:string[]): Promise<Orders>{
       const Order =  await this.orderRepository.addOrderRepository(userId,products);
          return Order
    }
}