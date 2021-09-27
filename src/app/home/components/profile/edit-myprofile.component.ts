import { Component } from '@angular/core';

@Component({
    template: `<app-register (isDirtyEvent)="confirmIsClean($event)"></app-register>`,
})
export class EditMyProfileComponent {
    isDirty: boolean = true;

    confirmIsClean( isDirty: boolean ) {
        this.isDirty = isDirty;
    }
}
