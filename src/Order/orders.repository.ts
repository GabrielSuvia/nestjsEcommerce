import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { Repository } from "typeorm";
import { Users } from "../Users/users.entity";
import { Products } from "../Products/products.entity";
import { OrderDetails } from "../OrderDetaill/orderDetails.entity";

@Injectable()

export class OrderRepository{
    constructor(@InjectRepository(Orders) private orderRepositoryDB: Repository<Orders>,
@InjectRepository(Users) private userRepositoryDB: Repository<Users>,
@InjectRepository(Products) private productRepositoryDB: Repository<Products>,
@InjectRepository(OrderDetails) private orderDetailsRespositoryDB: Repository<OrderDetails>
){}

   async getOrdersRepository(): Promise<Partial<Orders[]>>{
      const orders = await this.orderRepositoryDB.find()
      return orders;
   }

   async getOrderRepository(id:string):Promise<Partial<Orders>>{
       console.log('Repository1')
       const orders = await this.orderRepositoryDB.find();
       console.log('Repository2',orders)
       const order = await this.orderRepositoryDB.findOne({where:{id:id}})//devolver con detail y el areglo de producto
        console.log('Repository3',order)
            if(!order){
                throw new Error("Order not Found");
            }
            return order;
    }

   async addOrderRepository(userId: string, products:string[]):Promise<Orders>{
    //Busca a un usuario por id.
          const User = await this.userRepositoryDB.findOne({where: {id:userId}, relations:['orderId']})
        if(!User){
          throw new Error('invalid user')
        }
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

        if(Productos.length === 0){
              throw new Error('invalid product')
        }
            const resolveProduct =await Promise.all( Productos.map(async (prod)=> await prod)) 
      
            console.log("Products ready:",Productos)

              const createOrder = {user_Id:User ,date: new Date()};
              const newOrder = await this.orderRepositoryDB.create(createOrder);
              const orderr = await this.orderRepositoryDB.save(newOrder);
              
              console.log("1:", Productos,"number: ", priceTotal, orderr)
          //npo hay order

          let createOrderDetail = {price: Math.floor(priceTotal), products:resolveProduct}
          console.log("2:",createOrderDetail)//here

        const newOrderDetail: OrderDetails = await this.orderDetailsRespositoryDB.create(createOrderDetail)
        console.log("3:",newOrderDetail)

          const nuevaOrder = await this.orderDetailsRespositoryDB.save(newOrderDetail)
           console.log("4:", nuevaOrder)
          
          newOrder.orderDetails = nuevaOrder;
         const Order = await this.orderRepositoryDB.save(newOrder);
          console.log("5:", newOrder)

            User.orderId.push(newOrder);
          await this.userRepositoryDB.save(User);
          console.log("6:",Order)

                //return {id:newOrderDetail.id,price:newOrderDetail.price, ...Order};
           
                return Order
                
            }
        }