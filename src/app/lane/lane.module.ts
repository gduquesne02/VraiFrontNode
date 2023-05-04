import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaneRoutingModule } from './lane-routing.module';
import { LaneComponent } from './lane.component';
import { SharedModule } from '../shared/shared.module';
import { LaneListComponent } from './pages/lane-list/lane-list.component';
import { LaneService } from './services/lane.service';
import { LaneFormComponent } from './components/lane-form/lane-form.component';


@NgModule({
  declarations: [
    LaneComponent,
    LaneListComponent,
    LaneFormComponent,
    
  ],
  imports: [
    CommonModule,
    LaneRoutingModule,
    SharedModule
    
  ],
  providers: [
    LaneService
  ]
})
export class LaneModule { }
