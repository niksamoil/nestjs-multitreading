import { Controller, Get } from '@nestjs/common';
import { SomeServiceService } from './some-service.service';

@Controller()
export class SomeServiceController {
  constructor(private readonly someServiceService: SomeServiceService) {}

  @Get()
  getHello(): string {
    return this.someServiceService.getHello();
  }
}
