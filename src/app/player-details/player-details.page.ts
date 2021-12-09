import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toastController } from '@ionic/core';
import { Observable } from 'rxjs';
import { DbService } from '../services/db.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.page.html',
  styleUrls: ['./player-details.page.scss'],
})
export class PlayerDetailsPage implements OnInit {
  playerID: string;
  playerIDs: string[];
  playerData: Observable<any>;
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router,
    private db: DbService
  ) {}

  ngOnInit() {
    this.playerID = this.route.snapshot.paramMap.get('id');
    this.playerService
      .playerData(this.playerID)
      .subscribe((data) => (this.playerData = data));
    this.db.getPlayers().subscribe((ids) => {
      this.playerIDs = ids;
    });
  }

  button_clicked(playerID: string, statType: string) {
    this.router.navigate(['/statistics', { id: playerID, stat: statType }]);
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
}
