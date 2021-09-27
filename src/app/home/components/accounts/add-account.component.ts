import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService } from '../../services/account.service';


@Component({
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
    registerForm: FormGroup = this.fb.group({
        id: [''],
        accountName: [ '',  [ Validators.required ]],
        client: [ '', [ Validators.required ]],
        accountManager: [ '',  [ Validators.required ]],
        consult: [ '',  [ Validators.required ]],
      });
    
    isDirty: boolean = true;
    title = 'Create Account';
    accountEdited = false;
    durationInSeconds = 5;

    constructor( 
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        this.initEditAccount();
    }

    initEditAccount() {
        this.route.queryParams.subscribe( account => {
          if( account.id ) {
            this.registerForm.patchValue({
                id: account.id,
                accountName: account.accountName,
                client: account.client,
                accountManager: account.accountManager,
                consult: account.consult
            });

            this.title = 'Edit Account';
            this.accountEdited = true;
          }
        });
      }

    addAccount() {
        if( this.registerForm.invalid ) {
            return;
        }

        this.isDirty = false;

        this.accountService.addAccount( this.registerForm.value )
            .subscribe( resp => {
                this.router.navigate(['/home/accounts']);
            });

        this.registerForm.reset();
    }

    updateAccount() {
        if( this.registerForm.invalid ) {
          return;
        }

        this.isDirty = false;
    
        this.accountService.updateAccount( this.registerForm.value )
          .subscribe( resp => {
            this.router.navigate(['/home/accounts']);
          });
    
        this.registerForm.reset();
      }
}