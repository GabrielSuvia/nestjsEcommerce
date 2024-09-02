import { Orders } from "src/Order/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"users"
})
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type:'varchar', length:50, unique:true, nullable:false
    })
    email: string

    @Column({
        type:'varchar', length:50, unique:true,nullable:false
    })
    name: string

    @Column({
        type:'varchar' , length:80, nullable:false
    })
    password: string

    @Column({
        type:'varchar'
    })
    address: string

    @Column()
    phone: number

    @Column({
        type:'varchar',length:50
    })
    country: string

    @Column({
        type:'varchar' ,length:50
    })
    city:string
    
    @Column({default: false, nullable:true})
    isAdmin : boolean

   @OneToMany(()=>Orders,(orders)=> orders.user_id)
    orderId: Orders[]
}