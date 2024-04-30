import { Component } from '@angular/core';

import { MENU_ITEMS } from './user-menu';

@Component({
    selector: 'ngx-user',
    template: `
        <ngx-one-column-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-one-column-layout>
    `,
})
export class UserComponent {
    menu = MENU_ITEMS;
}
