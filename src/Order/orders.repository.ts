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
          let priceTotal = 0;
          const Productos = products.map(async (prodId)=>{//productos existentes
            //existentes en stock
             const product = await this.productRepositoryDB.findOneBy({id:prodId})
             if(product && product.stock !== 0){
              product.stock--;
              await this.productRepositoryDB.save(product)
              
              priceTotal =priceTotal + Number(product.price);
              return product;
             };
            });
            console.log("Products ready:",Productos)

              const createOrder = {user_Id:User ,date: new Date()};
              const newOrder = await this.orderRepositoryDB.create(createOrder);
              const orderr = await this.orderRepositoryDB.save(newOrder);
               console.log("ORDER CREATED:",orderr)
              
              console.log("orderRepository1", Productos,"number: ", priceTotal, orderr)
          //npo hay order
          let createOrderDetail = {price: Math.floor(priceTotal) ,order_id: orderr , products:Productos}
          console.log("ORDERDETAIL CREADO",createOrderDetail)

 

          const newOrderDetail: OrderDetails = await this.orderDetailsRespositoryDB.create(createOrderDetail);
          await this.orderDetailsRespositoryDB.save(newOrderDetail);
           console.log("SAVING NEWORDERDETAIL...", newOrderDetail)
          
          newOrder.OrderDetails = newOrderDetail;
          await this.orderRepositoryDB.save(newOrder);
          console.log("UPDATE NEWORDER...", newOrder)

            User.orderId.push(newOrder);
          await this.userRepositoryDB.save(User);
          console.log("NEWORDERDETAILL",User)

                return {id:newOrderDetail.id,price:newOrderDetail.price, ...newOrder};
                
            }
        }