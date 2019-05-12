import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var localStorage:any;
declare var JSON:any;

@Injectable()
export class InvoiceService {
  baseUrl = 'http://localhost:4201/';

  constructor(public http: Http) {

  }

  getInvoices(): Promise<any>{
    return new Promise(resolve => {
      this.http.get(this.baseUrl + 'api/invoice')
        .subscribe(data => {
          resolve(data.json());
        }, error => {
          resolve(error);
        });
    });
  }

  saveInvoice(data): Promise<any>{
    return new Promise(resolve => {
      if (!data.id) {
        this.http.post(this.baseUrl + 'api/invoice', data)
          .subscribe(data => {
            resolve(data.json());
          }, error => {
            resolve(error);
          });
      } else {
        this.http.put(this.baseUrl + 'api/invoice/' + data.id, data)
          .subscribe(data => {
            resolve(data.json());
          }, error => {
            resolve(error);
          });
      }
    });
  }

  deleteInvoice(id): Promise<any>{
    return new Promise(resolve => {
      this.http.delete(this.baseUrl + 'api/invoice/' + id)
        .subscribe(data => {
          resolve(data.json());
        }, error => {
          resolve(error);
        });
    });
  }
}
