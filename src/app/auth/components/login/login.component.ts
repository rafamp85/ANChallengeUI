import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: [ 'rafaelmp@gmail.com',  [Validators.required, Validators.email ]],
    password: [ '123456', [ Validators.required, Validators.minLength(6) ]]
  });

  durationInSeconds = 5;

  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) { }

  signIn() {

    console.log(this.loginForm.value);

    const {email, password} = this.loginForm.value;

    this.authService.login( email, password )
      .subscribe( ok => {
        if( ok === true ) {
          this.router.navigate(['/home']);
        } else {
          this.snackBar.open(
            ok, 
            'X', 
            {
              duration: this.durationInSeconds * 1000, 
              panelClass: ['error-snack']
            });
        }
      });

    this.loginForm.reset();
  }

}
