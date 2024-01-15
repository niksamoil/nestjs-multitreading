import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('NATS_CLIENT') private natsClient: ClientProxy) {}
  getHello(): string {
    return 'App is running!';
  }

  getHeavyComputation() {
    return lastValueFrom(
      this.natsClient.send(
        { type: 'some-service', cmd: 'heavy-computation' },
        'heavy',
      ),
    );
  }

  getOtherComputation() {
    return lastValueFrom(
      this.natsClient.send(
        { type: 'some-service', cmd: 'other-computation' },
        'other',
      ),
    );
  }
}
