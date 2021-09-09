import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IAccount } from "../../interfaces/account.model";
import { AccountService } from "../../services/account.service";

@Component({
    templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {

    displayedColumns: string[] = ['accountName', 'client', 'accountManager', 'consult'];
    accountData!: MatTableDataSource<IAccount>

    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private accountsService: AccountService
    ) {}

    ngOnInit() {
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
}