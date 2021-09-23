import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.template.html',
  styleUrls: ['./register.template.scss']
})
export class RegisterTemplateComponent implements OnInit {

  get auth() {
    return this.authService.auth;
  }

  registerForm: FormGroup = this.fb.group({
    id: [''],
    name: [ '',  [ Validators.required ]],
    email: [ '', [ Validators.required, Validators.email ]],
    password: [ '',  [ Validators.required, Validators.minLength(6) ]],
    abilities: this.fb.group({
      englishLevel: [ 0 ],
      techKnowledge: [ [] ]
    }),
  });

  title = 'Create User';
  userEdited = false;
  durationInSeconds = 5;
  userRole: string = environment.userRole;

  technologyList: string[] = ['Angular', 'Java', 'C#', 'React', 'JavaScript', 'Azure', '.NET'];

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initEditProfile();
  }

  initEditProfile() {
    this.route.queryParams.subscribe( user => {
      
      if( user.id ) {
        this.registerForm.patchValue({
          id: user.id,
          name: user.name,
          email: user.email,
          abilities: {
            englishLevel: user.englishLevel,
            techKnowledge: user.techKnowledge
          }
        });

        this.title = 'Edit User';
        this.userEdited = true;

        this.registerForm.controls['email'].disable();
        this.registerForm.get('password')?.clearValidators();
        this.registerForm.get('password')?.updateValueAndValidity();
      }

    });
  }

  registerUser() {
    if( this.registerForm.invalid ) {
      return;
    }

    console.log(this.registerForm.value);

    this.userService.addUser( this.registerForm.value )
      .subscribe( resp => {
        console.log(resp);

        this.router.navigate(['/home/users']);

        this.snackBar.open(
          'The User has been added', 
          'X', 
          {
            duration: this.durationInSeconds * 1000, 
            panelClass: ['success-snack']
        });
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

    this.userService.updateUser( this.registerForm.value )
      .subscribe( resp => {
        this.forwardUser();

        this.snackBar.open(
          'The User has been updated', 
          'X', 
          {
            duration: this.durationInSeconds * 1000, 
            panelClass: ['success-snack']
        });
      });

    this.registerForm.reset();
  }

  cancel() {
    this.forwardUser();
  }

  private forwardUser() {
    if( this.auth.role === this.userRole ) {
      this.router.navigate(['/home/my-profile']);
      return;
    }
    this.router.navigate(['/home/users']);
  }
}
