import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  template: `<app-template-profile [user]="user" [myProfile]="myProfile"></app-template-profile>`
})
export class MyProfileComponent implements OnInit {

    user: any;
    myProfile = true;

    get authUser() {
        return this.authService.auth;
    }

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.initData();
    }

    initData() {
        this.user = this.authUser;
    }
}
