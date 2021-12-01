import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  url = 'https://statsapi.web.nhl.com/api/v1/people/';
  url2 =
    '?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason';

  history: string[] = [];

  constructor(private http: HttpClient) {}

  playerData(playerID: string): Observable<any> {
    return this.http
      .get(this.url + playerID + this.url2)
      .pipe(map((data) => data['people']));
  }

  addToHistory(id: string){
    this.history.push(id);
  }

  getHistory(){
    return [...this.history];
  }
}
