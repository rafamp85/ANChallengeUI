import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
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
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ],
        data: {
        role: environment.adminRole
        },
      },
      { path: 'register', component: RegisterComponent,
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ],
        data: {
          role: environment.adminRole
        }
      },
      { path: 'accounts', component: AccountsComponent,
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ],
        data: {
          role: environment.adminRole
        }  
      },
      { path: 'add-account', component: AddAccountComponent, 
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ],
        data: {
          role: environment.adminRole
        }
      },
      { path: 'profile', component: ProfileComponent,
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ],
        data: {
          role: environment.adminRole
        }
      },
      { path: 'my-profile', component: MyProfileComponent,
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ],
        data: {
          role: environment.userRole
        }
      },
      { path: 'edit-profile', component: EditMyProfileComponent,
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ],
        data: {
          role: environment.userRole
        }
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