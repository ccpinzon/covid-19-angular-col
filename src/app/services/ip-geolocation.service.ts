import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpGeolocationService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get('https://api.ipdata.co/?api-key=3ce1f955c79716916174f9727b56937c20b85ee5842fa2bc1441e4a4');
  }

}
