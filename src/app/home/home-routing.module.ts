import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsComponent } from './components/accounts/accounts.component';
import { AddAccountComponent } from './components/accounts/add-account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/users/register.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'add-account', component: AddAccountComponent },
      { path: 'profile', component: ProfileComponent },
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