import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "src/decorator/roles.enum";
    /*
    const authVerification = request.headers['authorization'] ;//verificar con arrgelo o sin arreglo
    
    if(!authVerification){
        return false
    };
    const header = authVerification.split(' ')[1]; //["Basic:","email:password"] 0,1

    if(!header){
        return false;
    };
    const [email,password] = header.split(':');//["email","password"]
    if(!email && !password){
        return false;
    };
    return true;*/
    
@Injectable()
export class AuthGuard implements CanActivate {
constructor(private readonly jwtService: JwtService){}//with the token generated

canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
     
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]?? '';//catch element 1---0,1

      if(!token){
          throw new UnauthorizedException('Bearer token not found')
      };

      try {
        const secret='UnaClaveSecreta';
        const payLoad = this.jwtService.verify(token,{secret});
        payLoad.iat = new Date(payLoad.iat * 1000);
        payLoad.exp = new Date(payLoad.exp * 1000);
        request.user = payLoad;
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }

}
}