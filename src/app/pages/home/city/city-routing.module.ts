import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityPage } from './city.page';

const routes: Routes = [
  {
    path: '',
    component: CityPage
  },
  {
    path: ':cityDetailsId',
    loadChildren: () => import('./city-details/city-details.module').then( m => m.CityDetailsPageModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityPageRoutingModule {}
