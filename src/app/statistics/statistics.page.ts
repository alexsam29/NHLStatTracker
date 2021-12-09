import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  playerID: string;
  stat: string;
  playerData: Observable<any>;
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.playerID = this.route.snapshot.paramMap.get('id');
    this.stat = this.route.snapshot.paramMap.get('stat');
    this.playerService
      .playerData(this.playerID)
      .subscribe((data) => (this.playerData = data));
  }
}
