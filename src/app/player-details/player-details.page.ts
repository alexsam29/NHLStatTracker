import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.page.html',
  styleUrls: ['./player-details.page.scss'],
})
export class PlayerDetailsPage implements OnInit {
  playerID: string;
  playerData: Observable<any>;
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.playerID = this.route.snapshot.paramMap.get('id');
    this.playerService
      .playerData(this.playerID)
      .subscribe((data) => (this.playerData = data));
  }

  button_clicked(playerID: string, statType: string) {
    this.router.navigate(['/statistics', { id: playerID, stat: statType }]);
  }
}
