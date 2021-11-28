import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerDetailsPage } from './player-details.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerDetailsPageRoutingModule {}
