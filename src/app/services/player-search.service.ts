import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerSearchService {

  url = 'https://suggest.svc.nhl.com/svc/suggest/v1/minactiveplayers/'
  constructor(private http: HttpClient) { }

  searchData(name: string):
  Observable<any> {
    return this.http.get(this.url + name).
    pipe(
      map(data => data['suggestions']));
  }
}
