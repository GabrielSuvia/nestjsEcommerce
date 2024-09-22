import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../decorator/roles.enum";
import { Observable } from "rxjs";


@Injectable()

export class RolesGuard implements CanActivate{
    constructor(private readonly reflector:Reflector){}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
            context.getHandler(),
            context.getClass(),
        ])

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole =  ()=>{
            requiredRoles.some((role) => user?.roles?.include(role));}

            const valid =()=> user && user.roles && hasRole();

            if(!valid){
                throw new ForbiddenException('you don´t have permission and are not allowed to acces to this route')
            }
             return true;
}
}