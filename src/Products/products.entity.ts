import { Categories } from "src/Categories/categories.entity";
import { OrderDetails } from "src/OrderDetaill/orderDetails.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"products"
})
export class Products{
  
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'varchar', length:50, unique:true, nullable:false
    })
    name: string

    @Column({
        type:'varchar', nullable:false
    })
    description: string

    @Column({
        type:'decimal', precision:10, scale:2, nullable:false
    })
    price: number

    @Column({
        type:'int' ,nullable:false
    })
    stock: number

    @Column({
        type:'varchar', default:'defaul-image.png'
    })
    imgUrl: string

   @OneToMany(()=>Categories, (category)=> category.products)
    categoryId: Categories[]

   @ManyToMany(()=>OrderDetails,(orderDetails)=>orderDetails.products)
     orderDetails: OrderDetails[]
}