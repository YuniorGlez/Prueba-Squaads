import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresListPage } from './jugadores-list.page';

const routes: Routes = [
  {
    path: '',
    component: JugadoresListPage
  },
  {
    path: 'jugadores-add',
    loadChildren: () => import('../equipos-list/equipos-info/equipo-jugadores/jugadores-add/jugadores-add.module').then(m => m.JugadoresAddPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./jugadores-info/jugadores-info.module').then( m => m.JugadoresInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadoresListPageRoutingModule {}
