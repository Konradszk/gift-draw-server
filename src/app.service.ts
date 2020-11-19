import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  public getState(): string {
    return 'Working!';
  }
}
