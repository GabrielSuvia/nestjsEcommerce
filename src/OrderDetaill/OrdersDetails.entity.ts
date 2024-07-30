import { Orders } from "src/Order/orders.entity";
import { Products } from "src/Products/products.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

/*
OrderDetails

id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo. 

order_id: Relación 1:1 con orders.

Relación N:N con products.
*/ 


@Entity({
    name:"orderDeatils"
})

export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'int',precision:10, scale:2, nullable:false
    })
    price:number

    @OneToOne(()=>Orders)
    @JoinColumn()
    order_id:string

    @ManyToMany(()=>Products, (products)=> products.orderDetails)
    @JoinColumn()
    products: Products[]
}