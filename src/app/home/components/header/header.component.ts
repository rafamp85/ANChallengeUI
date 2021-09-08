import { Component  } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
    selector: 'oa-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    get auth() {
        return this.authService.auth;
    }

    constructor( 
        private router: Router,
        private authService: AuthService
    ) {}

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth']);
    }
}