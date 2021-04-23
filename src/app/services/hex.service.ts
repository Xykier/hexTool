import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IHex, IHexMap } from '../hex.interface';
import fontJSON from '../../fonts/gi.json';

@Injectable({
  providedIn: 'root'
})
export class HexService {
  // readonly baseUrl = 'http://192.168.0.125:3000/hex';
  readonly baseUrl = 'https://hextool-be.herokuapp.com/hex';

  allIcons: Array<any>;

  constructor(private http: HttpClient) {
    this.allIcons = Object.keys(fontJSON).map(key => ({
      name: key,
      value: fontJSON[key]
    }));
  }

  public getAllHexes(): Observable<IHexMap> {
    return this.http.get(this.baseUrl).pipe(
      map(data => data as IHexMap)
    );
  }

  public saveHex(x, y, data: IHex): Observable<any> {
    // console.log(hexData);
    const hexData = JSON.stringify(data);
    return this.http.post(`${this.baseUrl}/${x}/${y}`, { hexData });
  }

  public deleteHex(x, y): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${x}/${y}`);
  }
}
