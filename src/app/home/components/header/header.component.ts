import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
    selector: 'oa-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    userRole: string = environment.userRole;
    adminRole: string = environment.adminRole;

    get auth() {
        return this.authService.auth;
    }

    constructor( 
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        if (this.auth.role === this.userRole)
            this.router.navigate(['/home/my-profile'], {queryParams: this.auth});
    }

    editProfile() {
        this.router.navigate(['/home/my-profile'], {queryParams: this.auth});
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth']);
    }
}