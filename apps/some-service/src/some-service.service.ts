import { Injectable } from '@nestjs/common';

@Injectable()
export class SomeServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
