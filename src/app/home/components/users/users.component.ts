import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IAuth } from "src/app/auth/interfaces/auth.model";
import { UserService } from "../../services/user.service";

@Component({
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

    displayedColumns: string[] = ['name', 'email', 'role'];
    usersData!: MatTableDataSource<IAuth>

    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private usersService: UserService
    ) {}

    ngOnInit() {
        this.usersService.getAllUsers()
            .subscribe( (resp: any) => {
                console.log(resp.users);
                this.usersData = resp.users;

                this.isLoadingResults = false;
                this.isRateLimitReached = this.usersData === null;
            });
    }

    applyFilter(filter: string) {
        this.usersData.filter = filter.trim().toLowerCase();
    
        if (this.usersData.paginator) {
          this.usersData.paginator.firstPage();
        }
    }
}