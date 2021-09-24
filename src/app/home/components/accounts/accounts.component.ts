import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

import { IAccount } from "../../interfaces/account.model";
import { AccountService } from "../../services/account.service";

@Component({
    templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {

    displayedColumns: string[] = ['accountName', 'client', 'accountManager', 'consult', 'delete'];
    accountData!: MatTableDataSource<IAccount>

    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private router: Router,
        private accountsService: AccountService
    ) {}

    ngOnInit() {
        this.getAccountsData();
    }

    getAccountsData() {
        this.accountsService.getAllAccounts()
            .subscribe( (resp: any) => {
                this.accountData = resp.accounts;

                this.isLoadingResults = false;
                this.isRateLimitReached = this.accountData === null;
            });
    }

    applyFilter(filter: string) {
        this.accountData.filter = filter.trim().toLowerCase();
    
        if (this.accountData.paginator) {
          this.accountData.paginator.firstPage();
        }
    }

    editAccount(account: IAccount) {
        this.router.navigate(['/home/add-account'], {queryParams: account});
    }

    deleteAccount(user: IAccount) {
        this.accountsService.deleteAccount(user.id).subscribe( res => {
            console.log(res);
            this.getAccountsData();
        });
    }
}