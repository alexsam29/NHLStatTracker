import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-enterprise/secure-storage/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private databaseObj: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  players = new BehaviorSubject([]);

  constructor(private sqlite: SQLite, private plt: Platform) {
    this.plt.ready().then(() => {
      this.createDBAndTables();
    });
  }

  private createDBAndTables() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.databaseObj = db;
      this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS PLAYERS(id INTEGER PRIMARY KEY)`, []).then(() => {
        this.loadPlayerss();
        this.dbReady.next(true);
      })
      .catch(e => console.log(e));

    }).catch(e => console.log(e));
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getPlayers(): Observable<string[]> {
    return this.players.asObservable();
  }


  loadPlayerss() {
    return this.databaseObj.executeSql(`SELECT * FROM PLAYERS`, []).then(res => {
      let players: string[] = [];
      for(let i = 0; i < res.rows.length; i++) {
        players.push(res.rows.item(i).id);
      }
      this.players.next(players);
      // console.log('From database', res);
      // console.log('After serialize', players);
    }).catch(e=>console.log(e));
  }

  addPlayer(id: number) {
    let data = [id];
    return this.databaseObj.executeSql(`INSERT INTO PLAYERS(id) VALUES(?)`, data).then(res => {
      this.loadPlayerss();
      // console.log('Added Player', res);
      // console.log("Inserted Id", res.insertId);
      return res.insertId;
    }).catch(e=>console.log(e));
  }

  deletePlayerById(id: number) {
    return this.databaseObj.executeSql(`DELETE FROM PLAYERS WHERE ID=?`, [id]).then(res => {
      this.loadPlayerss();
    }).catch(e=>console.log(e));
  }

  deleteAllPlayers(){
    return this.databaseObj.executeSql(`DELETE FROM PLAYERS`, []).then(res => {
      this.loadPlayerss();
    }).catch(e=>console.log(e));
  }
}
