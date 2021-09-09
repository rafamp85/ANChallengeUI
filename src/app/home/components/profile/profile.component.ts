import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IAuth } from 'src/app/auth/interfaces/auth.model';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( user => {
      this.user = user;
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.role = user.role;
    });
  }

  editUser() {
    console.log(this.user);

    this.router.navigate(['/home/register'], {queryParams: this.user});
  }

}
