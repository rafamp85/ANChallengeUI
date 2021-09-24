import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { IAuth } from "src/app/auth/interfaces/auth.model";
import { UserService } from "../../services/user.service";


@Component({
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

    displayedColumns: string[] = ['name', 'email', 'role', 'englishLevel', 'techKnowledge', 'delete'];
    usersData!: MatTableDataSource<IAuth>

    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getUsersData();
    }

    getUsersData() {
        this.userService.getAllUsers()
            .subscribe( (resp: any) => {
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

    selectUser( user: IAuth ) {
        const englishLevel = user.abilities.englishLevel;
        const techKnowledge = user.abilities.techKnowledge;

        const userData = { ...user, englishLevel, techKnowledge};

        this.router.navigate(['/home/profile'], {queryParams: userData});
    }

    deleteUser(user: IAuth) {
        this.userService.deleteUser(user.id).subscribe( res => {
            console.log(res);
            this.getUsersData();
        });
    }
}