import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { Repository } from "typeorm";
import { Users } from "src/Users/users.entity";
import { Products } from "src/Products/products.entity";
import { OrderDetails } from "src/OrderDetaill/OrdersDetails.entity";

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

   async addOrderRepository(userId: string, products:Products[]){
    //Busca a un usuario por id.
          const User = await this.userRepositoryDB.findOneBy({id:userId})

          //Crea un registro en la tabla orders con el usuario encontrado.
          const Products = products.map(async (prod)=>{
              return await this.productRepositoryDB.findOneBy({id:prod.id})
            }) 

            let priceTotal = 0;
           for(const product of Products){
                priceTotal += (await product).price; 
          }
          const orderLast = User.orderId.length
          
          
          let createOrderDetail = {price:priceTotal ,order_id:User.orderId[orderLast], products:products}
         

          const createOrder = {user_Id:userId ,date: new Date(), orderDetails:createOrderDetail};
          const newOrder = await this.orderRepositoryDB.create(createOrder);
          
          await this.orderRepositoryDB.save(newOrder);

          //actualizar el orderDetails

          const newOrderDetail = await this.orderDetailsRespositoryDB.create(createOrderDetail);
          await this.orderDetailsRespositoryDB.save(newOrderDetail);
          

                    /*Busca los productos por id recibidos en la request actualizando el total de la compra y reduciendo el stock del producto. 
                    correspondiente. (al realizar la búsqueda de todos los productos aquellos con stock igual a 0 no deben ser mostrados).*/
                  let priceUpdate = 0;
                    for(const product of Products){
                    if((await product).stock === 0){
                        throw new Error("Product Not Found")
                     };
                     (await product).stock--;

                     await this.productRepositoryDB.save(await product)
                     priceUpdate += (await product).price;
                   }
                    newOrderDetail.price = priceTotal;
                    await this.orderDetailsRespositoryDB.save(newOrderDetail)

            //Construye y registra un detalle de compra con los productos seleccionados.

           //Devuelve la orden de compra con el precio y id del detalle de compra.
                return {id:newOrderDetail.id,price:newOrderDetail.price,...newOrder};
            }
        }