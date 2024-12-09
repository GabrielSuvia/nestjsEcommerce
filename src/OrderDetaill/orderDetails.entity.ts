import { Products } from "Products/products.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'orderdetails'
})

export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
    nullable:false, default:0
    })
    price:number

    @ManyToMany(()=>Products)
    @JoinTable()
    products: Products[]
}