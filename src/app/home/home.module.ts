import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HomeRoutingModule } from './home-routing.module';

import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/users/register.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AddAccountComponent } from './components/accounts/add-account.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileTemplateComponent } from './components/profile/profile.template';
import { MyProfileComponent } from './components/profile/my-profile.component';
import { EditMyProfileComponent } from './components/profile/edit-myprofile.component';
import { RegisterTemplateComponent } from './components/users/register.template';
import { checkDirtyStateAccount, checkDirtyStateProfile, checkDirtyStateRegister } from '../shared/validateDeactive';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    UsersComponent, 
    AccountsComponent,
    AddAccountComponent,
    FooterComponent,
    ProfileComponent,
    MyProfileComponent,
    RegisterComponent,
    RegisterTemplateComponent,
    ProfileTemplateComponent,
    EditMyProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MaterialModule
  ],
  providers: [
    {
      provide: 'canDeactiveRegister',
      useValue: checkDirtyStateRegister
    },
    {
      provide: 'canDeactiveAccount',
      useValue: checkDirtyStateAccount
    },
    {
      provide: 'canDeactiveProfile',
      useValue: checkDirtyStateProfile
    },
  ]
})
export class HomeModule { }
