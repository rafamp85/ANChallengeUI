import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { 
      path: 'auth', 
      loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
      path: 'home',
      loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
      canActivate: [AuthGuard],
      canLoad: [AuthGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }