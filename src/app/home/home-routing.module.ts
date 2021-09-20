import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

import { AccountsComponent } from './components/accounts/accounts.component';
import { AddAccountComponent } from './components/accounts/add-account.component';
import { EditMyProfileComponent } from './components/profile/edit-myprofile.component';
import { MyProfileComponent } from './components/profile/my-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/users/register.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'users', component: UsersComponent,
        // canLoad: [ AuthGuard ],
        // canActivate: [ AuthGuard ],
        // data: {
        // role: 'ADMIN_ROLE'
        // },
      },
      { path: 'register', component: RegisterComponent,
        // canLoad: [ AuthGuard ],
        // canActivate: [ AuthGuard ],
        // data: {
        //   role: 'ADMIN_ROLE'
        // }
      },
      { path: 'accounts', component: AccountsComponent,
        // canLoad: [ AuthGuard ],
        // canActivate: [ AuthGuard ],
        // data: {
        //   role: 'ADMIN_ROLE'
        // }  
      },
      { path: 'add-account', component: AddAccountComponent, 
        // canLoad: [ AuthGuard ],
        // canActivate: [ AuthGuard ],
        // data: {
        //   role: 'ADMIN_ROLE'
        // }
      },
      { path: 'profile', component: ProfileComponent,
        // canLoad: [ AuthGuard ],
        // canActivate: [ AuthGuard ],
        // data: {
        //   role: 'USER_ROLE'
        // }
      },
      { path: 'my-profile', component: MyProfileComponent,
        // canLoad: [ AuthGuard ],
        // canActivate: [ AuthGuard ],
        // data: {
        //   role: 'USER_ROLE'
        // }
      },
      { path: 'edit-profile', component: EditMyProfileComponent,
        // canLoad: [ AuthGuard ],
        // canActivate: [ AuthGuard ],
        // data: {
        //   role: 'USER_ROLE'
        // }
      },
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