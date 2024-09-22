import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common'
import { ProductService } from './products.service';
import { ProductsControllers } from './products.controller';
import { ProductsRepository } from './products.repository';
import { Products } from './products.entity';
import  {TypeOrmModule}  from '@nestjs/typeorm';
import { Categories } from '../Categories/categories.entity';
import { LogeeMiddleware } from '../middleware/logge.middleware';

@Module({
    imports:[TypeOrmModule.forFeature([Products]),TypeOrmModule.forFeature([Categories])],
    providers:[ProductService, ProductsRepository],
    controllers:[ProductsControllers]
})
export class ProductModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
         consumer.apply(LogeeMiddleware).forRoutes('products');
    }
}
