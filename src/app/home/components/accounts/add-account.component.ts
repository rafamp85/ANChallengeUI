import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent {
    registerForm: FormGroup = this.fb.group({
        accountName: [ '',  [ Validators.required ]],
        client: [ '', [ Validators.required ]],
        accountManager: [ '',  [ Validators.required ]],
        consult: [ '',  [ Validators.required ]],
      });
    
    durationInSeconds = 5;

    constructor( 
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
    ) { }

    registerUser() {

    if( this.registerForm.invalid ) {
        return;
    }

    console.log(this.registerForm.value);
    this.userService.addUser( this.registerForm.value )
        .subscribe( resp => console.log(resp));


    // this.registerForm.reset();
    }
}