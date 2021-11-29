import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerSearchService } from '../services/player-search.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  results: Observable<any>;
  playerName: string = '';

  constructor(private playerSearch: PlayerSearchService, private router: Router) {}

  searchChanged(){
    this.results = this.playerSearch.searchData(this.playerName);
  }

  item_clicked(playerID: string){
    this.router.navigate(['/player-details', { id: playerID }]);
  }
}
