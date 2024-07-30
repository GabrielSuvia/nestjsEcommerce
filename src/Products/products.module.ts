import {Module} from '@nestjs/common'
import { ProductService } from './products.service';
import { ProductsControllers } from './products.controller';
import { ProductsRepository } from './products.repository';
import { Products } from './products.entity';
import  {TypeOrmModule}  from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([Products])],
    providers:[ProductService, ProductsRepository],
    controllers:[ProductsControllers]
})
export class ProductModule{}
