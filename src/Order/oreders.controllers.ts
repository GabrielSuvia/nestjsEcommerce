import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { OrderCreateDto } from "src/DTOs/createOrder.dto";
import { Products } from "src/Products/products.entity";
import { AuthGuard } from "src/Auth/auth.guard";

@Controller('Orders')
export class OrderController{
    constructor(private readonly orderService:OrderService){}

    @Get(':id')
    //@UseGuards(AuthGuard)
    async getOrderControllers(@Param('id') id:string){
   //mostrara o buscara el id solicitado en order
     const order = await this.orderService.getOrderService(id);
     return order;
    }

    @Post('orders')
   // @UseGuards(AuthGuard)
    async createOrder(@Body() order:Partial<OrderCreateDto>){
              await this.orderService.addOrderService(order.user_id, order.products)
    }}
              
  /*
Crear el controlador de Orders
typescript
Copiar código
// src/orders/orders.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Orders> {
        return this.ordersService.addOrder(createOrderDto);
    }

    @Get(':id')
    async getOrder(@Param('id') id: string): Promise<Orders> {
        return this.ordersService.getOrder(id);
    }
}
       */
    
