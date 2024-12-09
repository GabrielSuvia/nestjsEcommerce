import { Categories } from "../Categories/categories.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"products"
})
export class Products{
  
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'varchar', length:50, unique:true, nullable:false, default:"nombre"
    })
    name: string

    @Column({
        type:'varchar', nullable:false, default:"description"
    })
    description: string

    @Column({
        type:'decimal', precision:10, scale:2, nullable:false, default:0
    })
    price: number

    @Column({
        type:'int' ,nullable:false, default:0
    })
    stock: number

    @Column({
        type:'varchar', default:"defaul-image.png"
    })
    imgUrl: string

    @ManyToOne(()=>Categories,(categories)=>categories.products)
    categoryid: Categories
}