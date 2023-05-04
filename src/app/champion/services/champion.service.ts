import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Champion } from '../models/champion';

@Injectable()

export class ChampionService {


  constructor(private http: HttpClient) { }

  getChampByLaneId(championId: number): Observable<Champion> {
    throw new Error('Method not implemented.');
  }
  
  get() : Observable<Champion[]>{
    return this.http.get<Champion[]>(environment.iutApiBaseUrl+"/champion");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(environment.iutApiBaseUrl+"/champion/"+id);
  }

  update(champion: Champion): Observable<string>{
    return this.http.put<string>(environment.iutApiBaseUrl+"/champion/"+champion.id, champion);
  }

  create(champion: Champion): Observable<string>{
    return this.http.post<string>(environment.iutApiBaseUrl+"/champion", champion);
  }

  getById(id:number): Observable<Champion>{
    console.log(this.http.get<Champion>(environment.iutApiBaseUrl+"/champion/"+id))
    return this.http.get<Champion>(environment.iutApiBaseUrl+"/champion/"+id);
  }

  getChampionsById(laneId: number): Observable<Champion[]> {
    return this.http.get<Champion[]>(`${environment.iutApiBaseUrl}/champion/lane/${laneId}`);
  }
}
