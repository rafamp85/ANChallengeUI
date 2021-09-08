import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsComponent } from './components/accounts/accounts.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: '**', component: UsersComponent }
    ]
  }
]


@NgModule({
  imports: [ 
    RouterModule.forChild( routes )
  ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule { }