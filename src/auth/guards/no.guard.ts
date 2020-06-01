import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class NoGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}
