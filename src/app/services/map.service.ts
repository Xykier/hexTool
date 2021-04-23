import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHex } from '../hex.interface';
import { IMap } from '../map.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // readonly baseUrl = 'http://192.168.0.125:3000/map';
  readonly baseUrl = 'https://hextool-be.herokuapp.com/map';

  constructor(private http: HttpClient) {}

  public getAllMaps(): Observable<IMap[]> {
    return this.http.get(this.baseUrl).pipe(
      map(data => data as IMap[])
    );
  }

  public getMap(mapName): Observable<IMap> {
    return this.http.get(`${this.baseUrl}/${mapName}`).pipe(
      map(data => data as IMap)
    );
  }

  public saveHex(mapName, x, y, data: IHex): Observable<any> {
    // console.log(hexData);
    const hexData = JSON.stringify(data);
    return this.http.post(`${this.baseUrl}/${mapName}/${x}/${y}`, { hexData });
  }

  public deleteHex(mapName, x, y): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${mapName}/${x}/${y}`);
  }
}
