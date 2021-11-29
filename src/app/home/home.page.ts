import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlayerSearchService } from '../services/player-search.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  results: Observable<any>;

  constructor(private playerSearch: PlayerSearchService) {}

  onSubmit(form: NgForm){
    this.results = this.playerSearch.searchData(form.value.playerName);
  }
}
