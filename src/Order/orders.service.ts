import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./orders.repository";
import { Orders } from "./orders.entity";

@Injectable()
export class OrderService{
constructor(private readonly orderRepository:OrderRepository){}
   async getOrderService(id:string) :Promise<Orders>{
          const order = await this.orderRepository.getOrderRepository(id)
          return order;
    }

   async addOrderService(userId:string, products:string[]): Promise<Orders>{
       const Order =  await this.orderRepository.addOrderRepository(userId,products);
       console.log("Service",Order)
          return Order
    }
}