import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaneComponent } from './lane.component';
import { LaneListComponent } from './pages/lane-list/lane-list.component';

const routes: Routes = [
  {
    path: '',
    component: LaneListComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaneRoutingModule { }
