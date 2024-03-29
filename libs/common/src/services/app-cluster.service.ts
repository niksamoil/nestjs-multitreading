import cluster from 'node:cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;

@Injectable()
export class AppClusterService {
  static clusterize(callback: () => void): void {
    if (cluster.isPrimary) {
      console.log(`Master server started on PID: ${process.pid}`);
      for (let i = 0; i < numCPUs / 2; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on PID: ${process.pid}`);
      callback();
    }
  }
}
