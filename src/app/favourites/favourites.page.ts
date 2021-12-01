import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from '../services/db.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  playerIDs: string[];
  players: Observable<any>[] = [];

  constructor(private playerService: PlayerService, private db: DbService) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe((rdy) => {
      if (rdy) {
        this.db.getPlayers().subscribe((ids) => {
          this.playerIDs = ids;
          for (var i = 0; i < this.playerIDs.length; ++i) {
            this.playerService
              .playerData(this.playerIDs[i])
              .subscribe((data) => this.players.push(data));
          }
        });
      }
    });
    console.log(this.players);
  }
}
