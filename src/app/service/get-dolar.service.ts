import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDolarDataService {
  dolarData: any;

  constructor(private http: HttpClient) {}

  getDolarData(): Observable<any> {
    return this.http.get('https://www.datos.gov.co/resource/32sa-8pi3.json');
  }
}
