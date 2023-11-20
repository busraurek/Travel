import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SavedItemsPage } from './pages/saved-items/saved-items.page';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    
  },
  {
    path: 'city',
    loadChildren: () => import('./pages/home/city/city.module').then( m => m.CityPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'saved-items',
    loadChildren: () => import('./pages/saved-items/saved-items.module').then( m => m.SavedItemsPageModule),
    component:SavedItemsPage,
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
