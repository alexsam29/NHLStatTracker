import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private playerService: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.playerID = this.route.snapshot.paramMap.get('id');
    this.playerService.playerData(this.playerID).subscribe(data => this.playerData = data);
    console.log(this.playerData);
  }

}
