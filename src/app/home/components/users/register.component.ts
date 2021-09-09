import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    name: [ '',  [ Validators.required ]],
    email: [ '', [ Validators.required, Validators.email ]],
    password: [ '',  [ Validators.required, Validators.minLength(6) ]]
  });

  durationInSeconds = 5;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initEditProfile();
  }

  initEditProfile() {
    this.route.queryParams.subscribe( user => {
      if( user ) {
        this.registerForm.patchValue({
          name: user.name,
          email: user.email
        });
      }
    });
  }

  registerUser() {

    if( this.registerForm.invalid ) {
      return;
    }

    this.userService.addUser( this.registerForm.value )
      .subscribe( resp => {
        console.log(resp);

        this.router.navigate(['/home/users']);
      });

    this.registerForm.reset();
  }
}
