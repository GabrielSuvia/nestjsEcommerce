import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { AuthGuard } from "src/Auth/auth.guard";

@Controller('orders')
export class OrderController{
    constructor(private readonly orderService:OrderService){}

    @Get(':id')
    //@UseGuards(AuthGuard)
    async getOrderControllers(@Param('id') id:string){

     const order = await this.orderService.getOrderService(id);
     return order;
    }

    @Post('create')
   // @UseGuards(AuthGuard)
    async createOrder(@Body() compras:{userId:string,products:string[]} ){
              await this.orderService.addOrderService(compras.userId,compras.products)
    }}
              