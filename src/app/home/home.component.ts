import { Component } from "@angular/core";

@Component({
    template: `
        <oa-header></oa-header>
        <router-outlet></router-outlet>
        <oa-footer></oa-footer>
    `
})
export class HomeComponent {}