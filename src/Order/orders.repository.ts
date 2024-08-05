import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { Repository } from "typeorm";
import { Users } from "src/Users/users.entity";
import { Products } from "src/Products/products.entity";
import { OrderDetails } from "src/OrderDetaill/orderDetails.entity";

@Injectable()

export class OrderRepository{
    constructor(@InjectRepository(Orders) private orderRepositoryDB: Repository<Orders>,
@InjectRepository(Users) private userRepositoryDB: Repository<Users>,
@InjectRepository(Products) private productRepositoryDB: Repository<Products>,
@InjectRepository(OrderDetails) private orderDetailsRespositoryDB: Repository<OrderDetails>
){}

   async getOrderRepository(id:string){
            const order = await this.orderRepositoryDB.findOne({where:{id:id}, relations:['orderDetail']})//devolver con detail y el areglo de producto
              
            if(!order){
                throw new Error("Order not Found");
            }
            return order;
    }

   async addOrderRepository(userId: string, products:string[]){
    //Busca a un usuario por id.
          const User = await this.userRepositoryDB.findOne({where: {id:userId}, relations:['orderId']})

          //Crea un registro en la tabla orders con el usuario encontrado.
          
          const Productos = products.map(async (prodId)=>{//productos existentes
            //existentes en stock
             const product = await this.productRepositoryDB.findOneBy({id:prodId})
             if(product){
              return product;
             };
            });

            let priceTotal = 0;
            for(const product of Productos){
              if((await product).stock === 0){
                 continue;
               };
               (await product).stock--;

               await this.productRepositoryDB.save(await product)
               priceTotal += (await product).price;
             }

              const createOrder = {user_Id:User ,date: new Date()};
              const newOrder = await this.orderRepositoryDB.create(createOrder);
    
              await this.orderRepositoryDB.save(newOrder);

              let orderLast:number 
              orderLast++;

              console.log("orderRepository1",await Productos,"number: ", priceTotal, User.orderId[orderLast])
          //npo hay order
          let createOrderDetail = {price:priceTotal ,order_id: User.orderId[orderLast], products: Productos}
          console.log("orderRepository2",createOrderDetail,"number: ", orderLast )

          //actualizar el orderDetails
          const newOrderDetail = await this.orderDetailsRespositoryDB.create(createOrderDetail);
          await this.orderDetailsRespositoryDB.save(newOrderDetail);
          
          newOrder.OrderDetails = newOrderDetail;
          await this.orderRepositoryDB.save(newOrder);
          
            User.orderId.push(newOrder);
          await this.userRepositoryDB.save(User);
                  

                return {id:newOrderDetail.id,price:newOrderDetail.price, ...newOrder};
                
            }
        }