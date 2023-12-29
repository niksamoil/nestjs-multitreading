import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('heavy')
  getHeavyComputation(): string {
    let sum = 0;
    for (let i = 0; i < 10e9; i++) {
      sum += i;
    }
    console.log(`Sum: ${sum}`);
    return `Sum: ${sum}`;
  }

  @Get('other')
  getOtherComputation(): string {
    let sum = 0;
    for (let i = 0; i < 10e7; i++) {
      sum += i;
    }
    console.log(`Sum other: ${sum}`);
    return `Sum other: ${sum}`;
  }
}
