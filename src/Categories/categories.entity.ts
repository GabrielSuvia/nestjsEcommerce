import { Products } from "../Products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'categories'
})
export class Categories{
 
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'varchar', length:50, nullable:false, unique:true, default:"name"
    })
    name:string//mouse

    @OneToMany(()=>Products, (product)=> product.categoryid)
    products: Products[]
}