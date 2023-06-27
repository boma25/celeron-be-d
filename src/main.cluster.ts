/** @format */

import * as cluster from 'cluster';
import * as os from 'os';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MainCluster {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  static clusterize(callback: any): void {
    const configService = new ConfigService();
    const logger = new Logger('CLUSTER');
    const numCPUs = os.cpus().length;
    if (
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cluster as any).isMaster &&
      configService.get('NODE_ENV') === 'production'
    ) {
      logger.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cluster as any).fork();
      }
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cluster as any).on('exit', (worker) => {
        logger.log(`Worker ${worker.process.pid} died. Restarting`);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cluster as any).fork();
      });
    } else {
      callback();
    }
  }
}
