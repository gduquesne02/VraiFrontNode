import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionRoutingModule } from './champion-routing.module';
import { ChampionComponent } from './champion.component';
import { SharedModule } from '../shared/shared.module';
import { ChampionListComponent } from './pages/champion-list/champion-list.component';
import { ChampionService } from './services/champion.service';
import { ChampionFormComponent } from './components/champion-form/champion-form.component';
import { ChampionCardComponent } from './component/champion-card/champion-card.component';

import { MatIconModule } from '@angular/material/icon';
import { ChampionDetailsComponent } from './pages/champion-details/champion-details.component';


@NgModule({
  declarations: [
    ChampionComponent,
    ChampionListComponent,
    ChampionFormComponent,
    ChampionComponent,
    ChampionCardComponent,
    ChampionDetailsComponent
  ],
  imports: [
    CommonModule,
    ChampionRoutingModule,
    SharedModule,
    MatIconModule,

    ],
  providers: [
    ChampionService
  ]
})
export class ChampionModule { }
