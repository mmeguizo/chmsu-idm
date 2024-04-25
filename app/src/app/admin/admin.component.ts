import { Component } from '@angular/core';

import { MENU_ITEMS } from './admin-menu';

@Component({
    selector: 'ngx-admin',
    template: `
        <ngx-one-column-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-one-column-layout>
    `,
})
export class AdminComponent {
    menu = MENU_ITEMS;
}
