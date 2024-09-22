import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { Response } from "express";
//import { AuthGuard } from "src/Auth/auth.guard";

@Controller('orders')
export class OrderController{
    constructor(private readonly orderService:OrderService){}

    @Get(':id')
    //@UseGuards(AuthGuard)
    async getOrderControllers(@Res() res:Response, @Param('id') id:string){
try {
    const order = await this.orderService.getOrderService(id);
    return res.status(200).json({order:order});
} catch (error) {
    throw new HttpException('invalid Order', HttpStatus.BAD_REQUEST)
}
    
    }

    @Post('create')
   // @UseGuards(AuthGuard)
    async createOrder(@Res() res:Response,@Body() compras:{userId:string,products:string[]} ){
        try {
           const orderObject = await this.orderService.addOrderService(compras.userId,compras.products)
           console.log("controller",orderObject)
            return res.status(201).json({order:orderObject})
        } catch (error) {
            throw new HttpException('Invalid user',HttpStatus.BAD_REQUEST)
        }
             
    }}
              