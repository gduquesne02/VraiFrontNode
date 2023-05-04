import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lane',
    pathMatch: 'full',
  },
  {
    path: 'lane',
    loadChildren: () => import('./lane/lane.module').then((m) => m.LaneModule),
  },
  {
    path: 'lane/:id',
    loadChildren: () => import('./lane/lane.module').then((m) => m.LaneModule),
  },

  
  {
    path: 'champion',
    loadChildren: () =>
      import('./champion/champion.module').then((m) => m.ChampionModule),
  },
  {
    path: 'champion/lane/:championid',
    loadChildren: () =>
      import('./champion/champion.module').then((m) => m.ChampionModule),
  },
  {
    path: ':id',
    loadChildren: () => import('./champion/champion.module').then((m) => m.ChampionModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
