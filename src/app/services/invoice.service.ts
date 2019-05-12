import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BaseService {

  constructor(public http: Http) {

  }

  getBase(url: string): Promise<any>{
    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          var data:any = { error: JSON.stringify(error)};
          window.Intercom('trackEvent', 'Seen Error on ' + moment().format('MMMM Do YYYY, h:mm:ss a'), data);
          resolve(error);
        });
    });
  }
}
