import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  template: `<app-template-profile [user]="user" [myProfile]="myProfile"></app-template-profile>`
})
export class MyProfileComponent implements OnInit {

    user: any = {};
    myProfile = true;

    get authUser() {
        return this.authService.auth;
    }

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.initData();
    }

    initData() {            
        this.userService.getUserById( this.authUser.id )
            .subscribe( (resp: any) => {
                this.user = resp.user;

                this.user.id = resp.user.id;
                this.user.name = resp.user.name;
                this.user.email = resp.user.email;
                this.user.role = resp.user.role;
                this.user.englishLevel = resp.user.abilities.englishLevel;
                this.user.techKnowledge = resp.user.abilities.techKnowledge;
            });
    }
}
