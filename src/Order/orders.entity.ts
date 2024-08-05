import { OrderDetails } from "src/OrderDetaill/orderDetails.entity";
import { Users } from "src/Users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name:'orders'
})
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=> Users,(user)=>user.orderId)
    user_id:Users

    @Column()
    date:Date

    @OneToOne(()=>OrderDetails,(orderDetails)=> orderDetails.order_id)
    @JoinColumn()
    OrderDetails:OrderDetails
}