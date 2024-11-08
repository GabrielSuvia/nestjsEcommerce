import { Orders } from "../Order/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"users"
})
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type:'varchar', length:50, unique:true, nullable:false, default:'email'
    })
    email: string

    @Column({
        type:'varchar', length:50, unique:true,nullable:false, default:'name'
    })
    name: string

    @Column({
        type:'varchar' , length:80, nullable:false, default:'password'
    })
    password: string

    @Column({
        type:'varchar', default:'address'
    })
    address: string

    @Column({default:0})
    phone: number

    @Column({
        type:'varchar',length:50, default:'country'
    })
    country: string

    @Column({
        type:'varchar' ,length:50, default:'city'
    })
    city:string
    
    @Column({default: false, nullable:true})
    isAdmin : boolean

   @OneToMany(()=>Orders,(orders)=> orders.user_id)
    orderId: Orders[]
}