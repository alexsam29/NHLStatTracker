import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerSearchService } from '../services/player-search.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  results: Observable<any>;
  playerName: string = '';
  isLoading: boolean = false;
  listHeader: string = 'Start Searching!';
  noResults: boolean = false;

  constructor(
    private playerSearch: PlayerSearchService,
    private router: Router,
    private playerService: PlayerService
  ) {}

  searchChanged() {
    this.listHeader = 'Results';
    this.isLoading = true;

    if (this.playerName == '') {
      this.results = null;
      this.isLoading = false;
      this.noResults = true;
      return;
    }
    this.playerSearch.searchData(this.playerName).subscribe((players) => {
      this.results = players;
      this.isLoading = false;
      this.noResults = false;
    });
  }

  item_clicked(playerID: string) {
    this.playerService.addToHistory(playerID);
    this.router.navigate(['/player-details', { id: playerID }]);
  }
}
