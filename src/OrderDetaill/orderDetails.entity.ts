import { Orders } from "src/Order/orders.entity";
import { Products } from "src/Products/products.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity({
    name:"orderDetails"
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

    @ManyToMany(()=>Products, (products)=> products.orderDetails)
    @JoinColumn()
    products: Promise<Products>[]
}