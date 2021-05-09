import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject('PG') private clientPg: Client) {}

  getTasks(): any {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (error, resp) => {
        if (error) {
          reject(error);
        }
        resolve(resp.rows);
      });
    });
  }
}
