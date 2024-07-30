import { OrderDetails } from "src/OrderDetaill/OrdersDetails.entity";
import { Users } from "src/Users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";


/*Categories

id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

Relación N:1 con products.



Orders

id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

user_id:  (Relación 1:N) con users.

date.

Relación 1:1 con orderDetails.
*/



@Entity({
    name:'orders'
})
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=> Users,(user)=>user.orderId)
    user_id:string

    @Column()
    date:Date

    @OneToOne(()=>OrderDetails)
    @JoinColumn()
    OrderDetails:OrderDetails
}