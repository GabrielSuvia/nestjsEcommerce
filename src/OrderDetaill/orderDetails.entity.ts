import { Orders } from "../Order/orders.entity";
import { Products } from "../Products/products.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'orderDetails'
})

export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
    nullable:false
    })
    price:number

    @OneToOne(()=>Orders,(order)=>order.OrderDetails )
    order_id: Orders

    @ManyToMany(()=>Products, (products)=> products.orderDetails, {lazy:true})
    @JoinColumn()
    products: Products[]
}