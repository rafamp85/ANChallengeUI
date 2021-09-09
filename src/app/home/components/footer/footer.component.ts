import { Component } from "@angular/core";

@Component({
    selector: 'oa-footer',
    template: `
        <div class="footer">
            <footer>ArkusNexus Todos los derechos reservados &copy; {{year}}</footer>
        </div>
    `
})
export class FooterComponent {
    year = new Date().getFullYear();
}