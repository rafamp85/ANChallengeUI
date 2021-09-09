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
    id: [''],
    name: [ '',  [ Validators.required ]],
    email: [ '', [ Validators.required, Validators.email ]],
    password: [ '',  [ Validators.required, Validators.minLength(6) ]]
  });

  title = 'Create User';
  userEdited = false;
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
      if( user.id ) {
        console.log(user);
        this.registerForm.patchValue({
          id: user.id,
          name: user.name,
          email: user.email
        });

        this.title = 'Edit User';
        this.userEdited = true;
        this.registerForm.controls['email'].disable();
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

  updateUser() {
    if( this.registerForm.invalid ) {
      return;
    }

    if( this.userEdited ) {
      this.registerForm.controls['email'].enable();
    }

    console.log(this.registerForm.value);

    this.userService.updateUser( this.registerForm.value )
      .subscribe( resp => {
        console.log(resp);

        this.router.navigate(['/home/users']);
      });

    this.registerForm.reset();
  }
}
