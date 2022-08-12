import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PowerByGuard implements CanActivate {

  constructor(){}

  canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
  
  async validateRequest(request){

    const authorization = request.headers;

    try {

      if(authorization['x-auth-token'].localeCompare(String(process.env.TOKEN_POWER_BY))){
        return true;
      }

    } catch (message ) { 
      return false
    }
  }
}