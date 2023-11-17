import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SavedItemsPage } from './pages/saved-items/saved-items.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'city',
    loadChildren: () => import('./pages/home/city/city.module').then( m => m.CityPageModule)
  },
  {
    path: 'saved-items',
    loadChildren: () => import('./pages/saved-items/saved-items.module').then( m => m.SavedItemsPageModule),
    component:SavedItemsPage
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
