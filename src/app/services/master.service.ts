import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Master } from '../models/master';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../configuration';
import { Details } from '../models/details';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  deleteMaster(no: string) {
    throw new Error('Method not implemented.');
  }
  serverURL='http://localhost:8090/'
  constructor(private http: HttpClient) { }
  createMaster(master:Master): Observable<boolean> {
    return this.http.post<boolean>(`${Configuration.serverURL}masters`, master);
  } 
  getMaster(): Observable<Master[]> {
    return this.http.get<Master[]>(`${Configuration.serverURL}masters`);
  }
  
}
