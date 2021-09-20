import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `<app-template-profile [user]="user"></app-template-profile>`
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.route.queryParams.subscribe( user => {
      if( user.id ) {
        this.user = user;
      } 
    });
  }

}
