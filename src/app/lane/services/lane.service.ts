import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Lane } from '../models/lane';

@Injectable({ providedIn: 'root' })

export class LaneService {

  constructor(private http: HttpClient) { }

  get() : Observable<Lane[]>{
    return this.http.get<Lane[]>(environment.iutApiBaseUrl+"/lane");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(environment.iutApiBaseUrl+"/lane/"+id);
  }

  update(student: Lane): Observable<string>{
    return this.http.put<string>(environment.iutApiBaseUrl+"/lane/"+student.id, student);
  }

  create(student: Lane): Observable<string>{
    return this.http.post<string>(environment.iutApiBaseUrl+"/lane", student);
  }

  getById(id:number): Observable<Lane>{
    const url = `${environment.iutApiBaseUrl}/fastfood/${id}`;
    return this.http.get<Lane>(url);
  }

  
}
