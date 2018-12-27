import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Log } from './log.util';
import { Network } from '../constants/network.constant';
import { Response } from '../models/response.model';

export class Communication {
  domain = Network.SERVICE;

  constructor(private http: HttpClient) { }

  get(url: string, callback: Function): void {
    this.http.get(this.domain + url).subscribe(
      (res: Response) => {
        if (this.hasContent(res)) {
          return callback(true, res.message, res.data);
        }

        return callback(true, null, null);
      },
      (err) => {
        const error = JSON.stringify(err);
        Log.error(error);

        callback(false, error);
      });
  }

  post(url: string, body: any, callback: Function): void {
    const options = {
      headers: new HttpHeaders ({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(this.domain + url, body, options).subscribe(
      (res: Response) => {
        if (this.hasContent(res)) {
          return callback(true, res.message, res.data);
        }

        return callback(true, null, null);
      },
      (err) => {
        const error = JSON.stringify(err);
        Log.error(error);

        callback(false, error);
      });
  }

  put(url: string, body: any, callback: Function): void {
    const options = {
      headers: new HttpHeaders ({
        'Content-Type': 'application/json'
      })
    };

    this.http.put(this.domain + url, body, options).subscribe(
      (res: Response) => {
        if (this.hasContent(res)) {
          return callback(true, res.message, res.data);
        }

        return callback(true, null, null);
      },
      (err) => {
        const error = JSON.stringify(err);
        Log.error(error);

        callback(false, error);
      });
  }

  delete(url: string, body: any, callback: Function): void {
    const options = {
      headers: new HttpHeaders ({
        'Content-Type': 'application/json'
      }),
      body: body
    };

    this.http.delete(this.domain + url, options).subscribe(
      (res: Response) => {
        if (this.hasContent(res)) {
          return callback(true, res.message, res.data);
        }

        return callback(true, null, null);

      },
      (err) => {
        const error = JSON.stringify(err);
        Log.error(error);

        callback(false, error);
      });
  }

  hasContent(res: Response): boolean {
    return res !== undefined && res !== null;
  }
}
