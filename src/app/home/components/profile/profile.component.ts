import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IAuth } from 'src/app/auth/interfaces/auth.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id: any;
  name: any;
  email: any;
  role: any;
  user: any;

  get authUser() {
    return this.authService.auth;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService  
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.route.queryParams.subscribe( user => {

      if( user.id ) {
        this.user = user;
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
      } else {
        this.name = this.authUser.name;
        this.role = this.authUser.role;
        this.email = this.authUser.email;
      }
    });
  }

  editUser() {
    this.router.navigate(['/home/register'], {queryParams: this.user});
  }

}
