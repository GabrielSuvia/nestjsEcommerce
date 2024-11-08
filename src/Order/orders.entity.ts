import { OrderDetails } from "../OrderDetaill/orderDetails.entity";
import { Users } from "../Users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name:'orders'
})
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=> Users,(user)=>user.orderId)
    user_id:Users

    @Column({default: ()=> 'CURRENT_TIMESTAMP'})
    date:Date

    @OneToOne(()=>OrderDetails)
    @JoinColumn()
    orderDetails:OrderDetails
}