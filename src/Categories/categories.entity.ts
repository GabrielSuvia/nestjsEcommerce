import { Products } from "src/Products/products.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/*id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

Relación N:1 con products.
*/

@Entity({
    name:'categories'
})

export class Categories{
 
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'varchar', length:50, nullable:false, unique:true
    })
    name:string//mouse

    @OneToMany(()=>Products, (product)=> product.categoryId)
    products: Products[]
}