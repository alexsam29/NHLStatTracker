import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { toastController } from '@ionic/core';
import { Observable } from 'rxjs';
import { DbService } from '../services/db.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  history: string[] = [];
  playerIDs: string[];
  players: Observable<any>[] = [];
  listHeader: string = 'No players in your history';
  constructor(
    private playerService: PlayerService,
    private router: Router,
    private db: DbService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.history = this.playerService.getHistory();
    if (this.history.length > 0) {
      this.listHeader = 'History:';
    }
    for (var i = 0; i < this.history.length; ++i) {
      this.playerService
        .playerData(this.history[i])
        .subscribe((data) => this.players.push(data));
    }

    this.db.getPlayers().subscribe((ids) => {
      this.playerIDs = ids;
    });
  }

  card_clicked(playerID: string) {
    this.router.navigate(['/player-details', { id: playerID }]);
  }

  async fav_clicked(id: string, name: string) {
    if (!this.playerIDs.includes(id)) {
      this.db.addPlayer(parseInt(id));
      const popup = await toastController.create({
        duration: 5000,
        header: `Player Added!`,
        message: `${name} was added to your Favourites`,
        color: 'success',
        position: 'bottom',
        buttons: [
          {
            side: 'end',
            text: 'Dismiss',
          },
        ],
      });

      await popup.present();
    } else {
      const popup = await toastController.create({
        duration: 5000,
        header: 'Error!',
        message: `${name} could not be added.`,
        color: 'danger',
        position: 'top',
        buttons: [
          {
            side: 'end',
            text: 'Dismiss',
          },
        ],
      });

      await popup.present();
    }
  }

  async addAll() {
    const alert = await this.alertController.create({
      header: `Add All Players?`,
      message: `Do you want to add all players to your favourites?`,
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'Add',
          handler: () => {
            for (var i = 0; i < this.history.length; ++i) {
              this.db.addPlayer(parseInt(this.history[i]));
            }
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
