import { Module, OnModuleInit } from '@nestjs/common';
import { UserModule } from './Users/users.module';
import { ProductModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import {InjectRepository, TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { OrderModule } from './Order/orders.module';
import { FilesModule } from './Files/file.module';
import {JwtModule} from '@nestjs/jwt';
import { CategoriesModule } from './Categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[typeOrmConfig]// load:[typeOrmConfig]//configService.typeorm;
  }),
  TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory: (configService:ConfigService) =>(configService.get('typeorms'))}), 
    
    JwtModule.register({
      global:true,
      signOptions:{expiresIn:'1h'},
      secret:process.env.KEY_JWT
    }),
     UserModule,CategoriesModule,ProductModule,AuthModule,OrderModule,FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule  {
  
}
