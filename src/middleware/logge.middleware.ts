import { Injectable,NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";

Injectable()
export class LogeeMiddleware implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
   console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url} a la hora ${new Date().toISOString()}`)
   next();
    }
}