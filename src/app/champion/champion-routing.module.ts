import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionComponent } from './champion.component';
import { ChampionListComponent } from './pages/champion-list/champion-list.component';
import { ChampionDetailsComponent } from './pages/champion-details/champion-details.component';

const routes: Routes = [
  {
    path: '',
    component: ChampionListComponent
  },
  {
    path: ':id',
    component: ChampionDetailsComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampionRoutingModule { }
