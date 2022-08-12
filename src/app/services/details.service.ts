import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { Details } from '../models/details';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  serverURL='http://localhost:8090/'
  constructor(private http: HttpClient) { }
  createDetails(details:Details): Observable<boolean> {
    return this.http.post<boolean>(`${Configuration.serverURL}details`, details);
  } 
  getDetails(): Observable<Details[]> {
    return this.http.get<Details[]>(`${Configuration.serverURL}details`);
  }
  deleteDetails(serialNo: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${Configuration.serverURL}details/${serialNo}`);
    } 
}
