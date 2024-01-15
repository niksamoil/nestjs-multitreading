import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SomeServiceService {
  private logger = new Logger(SomeServiceService.name);

  getHello(): string {
    return 'Hello World!';
  }

  getHeavyComputation(): string {
    let sum = 0;
    for (let i = 0; i < 10e9; i++) {
      sum += i;
    }
    // console.log(`Sum heavy: ${sum}`);
    this.logger.log(`Sum heavy: ${sum}`);
    return `Sum heavy: ${sum}`;
  }

  getOtherComputation(): string {
    let sum = 0;
    for (let i = 0; i < 10e7; i++) {
      sum += i;
    }
    // console.log(`Sum other: ${sum}`);
    this.logger.log(`Sum other: ${sum}`);
    return `Sum other: ${sum}`;
  }
}
