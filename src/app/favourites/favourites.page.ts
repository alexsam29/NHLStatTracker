import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  players: Observable<any>[];
  listHeader: string = 'No players in Favourites';

  constructor(
    private playerService: PlayerService,
    private db: DbService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe((rdy) => {
      if (rdy) {
        this.db.getPlayers().subscribe((ids) => {
          this.playerIDs = ids;
          if (this.playerIDs.length > 0) {
            this.listHeader = 'Favourites:';
          } else {
            this.listHeader = 'No players in Favourites';
          }
          this.players = [];
          for (var i = 0; i < this.playerIDs.length; ++i) {
            this.playerService
              .playerData(this.playerIDs[i])
              .subscribe((data) => this.players.push(data));
          }
        });
      }
    });
  }

  async remove_clicked(id: string, name: string, object: Observable<any>) {
    const alert = await this.alertController.create({
      header: `Delete ${name}?`,
      message: `Do you want to delete ${name} from your favourites?`,
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.db.deletePlayerById(parseInt(id));
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  card_clicked(playerID: string) {
    this.router.navigate(['/player-details', { id: playerID }]);
  }

  async deleteAll() {
    const alert = await this.alertController.create({
      header: `Delete All Players?`,
      message: `Do you want to delete all players from your favourites? This cannot be undone.`,
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.db.deleteAllPlayers();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }
}
