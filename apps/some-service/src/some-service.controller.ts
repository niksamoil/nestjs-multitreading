import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SomeServiceService } from './some-service.service';

@Controller()
export class SomeServiceController {
  constructor(private readonly someServiceService: SomeServiceService) {}

  @Get()
  getHello(): string {
    return this.someServiceService.getHello();
  }

  @EventPattern({ type: 'some-service', cmd: 'heavy-computation' })
  getHeavyComputation(payload): string {
    console.log('getHeavyComputation() called', payload);
    return this.someServiceService.getHeavyComputation();
  }

  @EventPattern({ type: 'some-service', cmd: 'other-computation' })
  getOtherComputation(payload): string {
    console.log('getOtherComputation() called', payload);
    return this.someServiceService.getOtherComputation();
  }
}
